import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_connection
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from sqlite3 import IntegrityError
from http import HTTPStatus

#Models 
class User(BaseModel):
    user_id: int = 0
    name: str = ""
    email : str = ""
    password : str = ""
    address: str = ""
    helper: bool = False
    points: int = 0

class Request(BaseModel):
    request_id: int = 0
    user_id : int = 0
    helper_id: int = None
    title: str = ""
    text: str = ""
    status: str = "open"
    
class Message(BaseModel):
    message_id: int = 0
    request_id: int = 0
    user_id: int = 0
    message_text : str = ""
    date_time: str = ""

request_status = ["open", "closed", "in_progress"]

#load environment variables like the DB name
load_dotenv()
DB_NAME = os.getenv("DB_NAME")

#start the app
app = FastAPI()

#allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_origins=["https://marlonwa.github.io", "https://css.wiesemann.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Default Endpoint
@app.get("/")
async def hello():
    return "Hello World"

#USER DATA
#GET User
@app.get("/users")
#returns all users from table "users"
async def get_users():
    conn = get_db_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(u) for u in users]

@app.get("/user/{user_id}")
#returns a user from table "users" by user_id, returns HTTPStatus.NOT_FOUND if not found
async def get_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    if user:
        return {
            "user_id": user["user_id"],
            "name": user["name"],
            "email": user["email"],
            "password": user["password"],
            "address": user["address"],
            "helper": user["helper"],
            "points": user["points"]
        }
    else: 
        raise HTTPException(status_code=404, detail="User not found")

@app.post("/login")
#returns a user from table "users" by user_id, returns HTTPStatus.NOT_FOUND if not found
async def login(email: str, helper: bool):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    conn.close()
    if user:
        return {
            "user_id": user["user_id"],
            "password": user["password"],
            "helper": user["helper"]
        }
    else: 
        raise HTTPException(status_code=404, detail="User not found")

#POST User 
@app.post("/user", status_code=HTTPStatus.CREATED)
#creates a new user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def create_user(user: User):
    conn = get_db_connection()
    try: 
        cursor = conn.execute("INSERT INTO users (name, email, password, address, helper, points) VALUES (?, ?, ?, ?, ?, ?)", 
                 (user.name, user.email, user.password, user.address, user.helper, user.points,))
        conn.commit()
        uid = cursor.lastrowid
        conn.close()
        return {
            "user_id": uid
        }
    except IntegrityError: 
        conn.close()
        raise HTTPException(status_code=409, detail="Email already used")

#PUT user
@app.put("/user/{user_id}")
#updates a user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def update_user(user_id: int, user: User):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE users SET name = ?, email = ?, password = ?, address = ?, helper = ?, points = ? WHERE user_id = ?", 
                     (user.name, user.email, user.password, user.address, user.helper, user.points, user_id))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="Email already used")

#DELETE user
@app.delete("/user/{user_id}")
#deletes a user from table "users", returns HTTPStatus.ACCEPTED
async def delete_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("DELETE FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED

#add 1 point for finished help
@app.put("/user/point/{user_id}")
#adds 1 point to user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def add_point(user_id: int):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE users SET points = points + 1 WHERE user_id = ?", 
                     (user_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="User not found")


#REQUEST DATA
#GET request 
@app.get("/requests")
#returns all requests from table "requests"
async def get_requests():
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests").fetchall()
    conn.close()
    return [dict(r) for r in request]

@app.get("/requests/{status}")
#returns all requests from table "requests" by status
async def get_open_requests(status: str):
    if(status not in request_status):
        raise HTTPException(status_code=406, detail="Invalid status")
    
    conn = get_db_connection()
    try: 
        requests = conn.execute("SELECT * FROM requests WHERE status = ?", (status,)).fetchall()
        conn.close()
        return [dict(r) for r in requests]
    except Exception as e: 
        conn.close()
        raise HTTPException(status_code=500, detail="Error fetching requests")
    
@app.get("/request/{request_id}")
#returns a request from table "requests" by request_id, returns HTTPStatus.NOT_FOUND if not found
async def get_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.close()
    if(request):
        return dict(request)
    else: 
        raise HTTPException(status_code=404, detail="Request not found")
    
@app.get("/user/{user_id}/requests")
#returns all requests from a specific creator (user_id)
async def get_user_requests(user_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE user_id = ?", (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in request]

#POST request
@app.post("/request")
#creates a new request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def create_request(request: Request):
    conn = get_db_connection()
    print(request)
    try: 
        conn.execute("INSERT INTO requests (user_id, title, text, helper_id, status) VALUES (?, ?, ?, ?, ?)", 
                 (request.user_id, request.title, request.text, request.helper_id, request.status,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError: 
        conn.close()
        raise HTTPException(status_code=409, detail="Request not found")

#PUT request
@app.put("/request/{request_id}")
#updates a request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def update_request(request_id: int, request: Request):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE requests SET title = ?, text = ? WHERE request_id = ?", 
                     (request.title, request.text, request_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="Request not found")

#PUT request
@app.put("/request/status/{request_id}/{status}")
#updates a request status in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def update_request_status(request_id: int, status: str):
    if(status not in request_status):
        raise HTTPException(status_code=406, detail="Invalid status")
    
    conn = get_db_connection()
    try:
        if status == "closed":
            conn.execute("UPDATE requests SET status = ?, helper_id = NULL WHERE request_id = ?", 
                         (status, request_id,))
        else:
            conn.execute("UPDATE requests SET status = ? WHERE request_id = ?", 
                         (status, request_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="Request not found")

#DELETE request
@app.delete("/request/{request_id}")
#deletes a request from table "requests", returns HTTPStatus.ACCEPTED
async def delete_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("DELETE FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED

    
@app.get("/user/{user_id}/chats")
#return chat overview for a person (others_name, request_id, last message, title, status)
async def get_user_chats(user_id: int):
    conn = get_db_connection()
    requests = conn.execute(
    """ 
    SELECT
        u.name,
        r.request_id,
        m.message_text,
        r.title,
        r.status
    FROM requests r
    LEFT JOIN (
            SELECT *,
                ROW_NUMBER() OVER (
                    PARTITION BY request_id
                    ORDER BY date_time DESC, message_id DESC
                ) AS rn
            FROM messages
        ) m
        ON m.request_id = r.request_id
       AND m.rn = 1
    JOIN users u 
        ON (u.user_id = 
            CASE
                WHEN r.user_id = ? THEN r.helper_id ELSE r.user_id
            END)
    WHERE r.user_id = ? OR r.helper_id = ?;
    """, (user_id, user_id, user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in requests]


#MESSAGE DATA


#GET message 
@app.get("/messages")
#returns all messages from table "messages"
async def get_messages():
    conn = get_db_connection()
    message = conn.execute("SELECT * FROM messages").fetchall()
    conn.close()
    return [dict(r) for r in message]
    
@app.get("/message/{message_id}")
#returns a message from table "messages" by message_id, returns HTTPStatus.NOT_FOUND if not found
async def get_message(message_id: int):
    conn = get_db_connection()
    message = conn.execute("SELECT * FROM messages WHERE message_id = ?", (message_id,)).fetchone()
    conn.close()
    if(message):
        return dict(message)
    else: 
        raise HTTPException(status_code=404, detail="message not found")

@app.get("/messages/{request_id}")
#returns all messages from table "messages" by request_id, returns HTTPStatus.NOT_FOUND if not found
async def get_chat_messages(request_id: int):
    conn = get_db_connection()
    message = conn.execute("SELECT * FROM messages WHERE request_id = ?", (request_id,)).fetchall()
    if(message):
        conn.close()
        return [dict(r) for r in message]
    else: 
        req = conn.execute("SELECT * FROM requests WHERE request_id = ?", (request_id,)).fetchone()
        conn.close()
        if req is None:
            raise HTTPException(status_code=404, detail="Request not found")
        else:
            raise HTTPException(status_code=204, detail="no messages found")

#POST message
@app.post("/message", status_code=HTTPStatus.CREATED)
#creates a new message in table "messages", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def create_message(message: Message):
    conn = get_db_connection()
    try: 
        if not conn.execute("SELECT * FROM requests WHERE request_id = ?", (message.request_id,)).fetchone():
            conn.close()
            raise HTTPException(status_code=404, detail="Request not found")
        
        conn.execute("INSERT INTO messages (request_id, user_id, message_text) VALUES (?, ?, ?)", 
                 (message.request_id, message.user_id, message.message_text,))
        conn.commit()
        conn.close()
        return 
    except IntegrityError: 
        conn.close()
        raise HTTPException(status_code=409, detail="message not found")

#PUT message
@app.put("/message/{message_id}")
#updates a message in table "messages", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def update_message(message_id: int, message: Message):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE messages SET message_text = ? WHERE message_id = ?", 
                     (message.message_text, message_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="message not found")

#DELETE message
@app.delete("/message/{message_id}")
#deletes a message from table "messages", returns HTTPStatus.ACCEPTED
async def delete_message(message_id: int):
    conn = get_db_connection()
    conn.execute("DELETE FROM messages WHERE message_id = ?", (message_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED

@app.delete("/messages/{request_id}")
#deletes all messages by request_id (DELETE CHAT)
async def delete_message(request_id: int):
    conn = get_db_connection()
    conn.execute("DELETE FROM messages WHERE request_id = ?", (request_id,)).fetchall()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED



#SCOREBOARD DATA
@app.get("/scoreboard/")
#get global scoreboard
async def get_scoreboard():
    conn = get_db_connection()
    points = conn.execute("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as place, name, points FROM users ORDER BY points DESC LIMIT 3").fetchall()
    conn.close()
    
    return [dict(u) for u in points]
    
@app.get("/scoreboard/{user_id}")
#get User scorerank and score
async def get_scoreboard_status(user_id: int):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    rank = conn.execute("SELECT rank FROM (SELECT user_id, ROW_NUMBER() OVER (ORDER BY points DESC) AS rank FROM users) WHERE user_id = ?", (user_id,)).fetchone()
    top3 = conn.execute("SELECT * FROM users ORDER BY points DESC LIMIT 3").fetchall()
    conn.close()

    if len(top3) == 1:
        top3 = [dict(top3[0]), dict(top3[0]), dict(top3[0])]
    elif len(top3) == 2:
        top3 = [dict(top3[0]), dict(top3[1]), dict(top3[1])]
    
    return {
        "top1": top3[0],
        "top2": top3[1],
        "top3": top3[2],
        "user" : user,
        "user_rank" : rank["rank"]
    }


#HELPER DATA
#GET user
# get all chats assigned to a specific helper (helper_id)
@app.get("/helper/{helper_id}/requests") 
async def get_requests_by_helper(helper_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE helper_id = ?", (helper_id,)).fetchall()
    conn.close()
    return [dict(r) for r in request]

#PUT request
@app.put("/helper/{helper_id}/{request_id}")
#updates a request helper in table "requests", returns HTTPStatus.OK on success, HTTPStatus.CONFLICT on failure
async def update_helper_for_request(request_id: int, helper_id: int):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE requests SET helper_id = ?, status = ? WHERE request_id = ?", 
                     (helper_id, "in_progress", request_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="Request not found")

#PUT request
@app.put("/helper/{helper_id}/remove/{request_id}")
#removes a helper from a request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def delete_helper_for_request(helper_id: int, request_id: int):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE requests SET helper_id = NULL, status = ? WHERE request_id = ?", 
                     ("open", request_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="Request not found")



#SETUP DB
@app.post("/reset")
#Reset Database
async def resetDB():
    #delete old DB if exists
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
    
    createUserTable()
    createRequestTable()
    createChatTable()
    createMessageTable()

    await testUserData()
    await testRequestData()
    await testMessageData()

    print("Neue DB erstellt")


#SETUP DB WITHOUT TEST DATA
@app.post("/cleanreset")
#Reset Database
async def resetDB():
    #delete old DB if exists
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
    
    createUserTable()
    createRequestTable()
    createChatTable()
    createMessageTable()

    print("Neue DB erstellt")

def createUserTable():
    #create table users
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            helper BOOLEAN,
            points INTEGER DEFAULT 0
        );
    """)

    conn.commit()
    conn.close()

    print("Neue User erstellt")

def createRequestTable():
    #create table requests
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE requests (
            request_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            helper_id INTEGER,
            title TEXT NOT NULL,
            text VARCHAR(255),
            status VARCHAR(20) DEFAULT 'open'
        );
    """)

    conn.commit()
    conn.close()

    print("Neue Request erstellt")

def createChatTable():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE chats (
            request_id INTEGER PRIMARY KEY NOT NULL,
            helper_id INTEGER NOT NULL,
            help_id INTEGER NOT NULL
        );
    """)

    conn.commit()
    conn.close()

    print("Neue Chats erstellt")
    
def createMessageTable():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE messages (
            message_id INTEGER PRIMARY KEY AUTOINCREMENT,
            request_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            message_text TEXT,
            date_time DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    conn.close()

    print("Neue Messages erstellt")

#TEST DATA
async def testUserData():
    users = [
        User(name="Marlon W", email="marlon.w@email.de", password="MWS2024!", address="Marienplatz 12, München", helper=True, points=85),
        User(name="Peter Müller", email="peter.mueller@gmx.de", password="PeterM123", address="Hauptstraße 45, Augsburg", helper=True, points=62),
        User(name="Anna Wagner", email="a.wagner@web.de", password="Anna!99", address="Bahnhofstraße 8, Nürnberg", helper=True, points=41),
        User(name="Sophie W", email="sophie.w@email.de", password="SophieW2024", address="Gartenweg 23, Regensburg", helper=False, points=0),
        User(name="Otto Hoffmann", email="otto.h@gmx.net", password="Otto123!", address="Rosenstraße 17, Passau", helper=False, points=0),
        User(name="Wolfgang Klein", email="w.klein@yahoo.de", password="Wolfgang!2024", address="Kirchplatz 9, Landshut", helper=False, points=0)
]
    
    for u in users:
        await create_user(u)
        
    print("Test Users created")

async def testRequestData():
    requests = [
        Request(user_id=4, helper_id=1, title="Hilfe beim WLAN einrichten", text="Ich komme nicht ins Internet. Mein Router blinkt rot und ich weiß nicht, was ich tun soll.", status="in_progress"),
        Request(user_id=5, title="WhatsApp installieren", text="Meine Enkelin hat mir geschrieben, dass ich WhatsApp brauche. Wie bekomme ich das auf mein Handy?", status="open"),
        Request(user_id=6, title="E-Mail-Anhang öffnen", text="Ich habe eine wichtige E-Mail mit einem PDF bekommen, aber ich kann es nicht öffnen. Können Sie mir helfen?", status="open"),
        Request(user_id=4, helper_id=2, title="Passwort vergessen", text="Ich habe mein E-Mail-Passwort vergessen und komme nicht mehr rein. Was kann ich tun?", status="closed"),
        Request(user_id=5, helper_id=3, title="Smartphone zu langsam", text="Mein Handy ist sehr langsam geworden. Viele Apps reagieren nicht mehr richtig.", status="in_progress")
    ]
    
    for r in requests:
        await create_request(r)
        
    print("Test Requests created")


async def testMessageData():
    messages = [
        # Chat 1: Marlon hilft Sophie mit WLAN
        Message(request_id=1, user_id=4, message_text="Hallo Marlon, vielen Dank, dass Sie mir helfen möchten!"),
        Message(request_id=1, user_id=1, message_text="Guten Tag Sophie! Gerne helfe ich Ihnen. Können Sie mir sagen, welche Farbe die Lampe am Router hat?"),
        Message(request_id=1, user_id=4, message_text="Die Lampe blinkt rot. Ist das schlecht?"),
        Message(request_id=1, user_id=1, message_text="Das bedeutet meist, dass keine Internetverbindung besteht. Versuchen Sie bitte, den Router für 30 Sekunden auszuschalten und dann wieder einzuschalten."),
        Message(request_id=1, user_id=4, message_text="Okay, ich probiere das jetzt mal..."),
        Message(request_id=1, user_id=4, message_text="Es funktioniert! Die Lampe ist jetzt grün. Vielen Dank!"),
        Message(request_id=1, user_id=1, message_text="Sehr gut! Das freut mich. Falls Sie noch Fragen haben, melden Sie sich gerne."),
        
        # Chat 2: Peter hilft Sophie mit Passwort (abgeschlossen)
        Message(request_id=4, user_id=4, message_text="Hallo Peter, ich komme nicht mehr in meine E-Mails..."),
        Message(request_id=4, user_id=2, message_text="Hallo Sophie! Kein Problem, das kriegen wir hin. Welcher E-Mail-Anbieter ist das?"),
        Message(request_id=4, user_id=4, message_text="Das ist T-Online."),
        Message(request_id=4, user_id=2, message_text="Okay, gehen Sie auf die T-Online Webseite und klicken Sie auf 'Passwort vergessen'. Dann bekommen Sie eine SMS oder E-Mail zum Zurücksetzen."),
        Message(request_id=4, user_id=4, message_text="Ah verstehe! Das hat geklappt, ich habe jetzt ein neues Passwort. Danke!"),
        
        # Chat 3: Anna hilft Otto mit langsamem Handy
        Message(request_id=5, user_id=5, message_text="Hallo Anna, mein Handy ist so langsam geworden..."),
        Message(request_id=5, user_id=3, message_text="Hallo Otto! Das können wir zusammen anschauen. Wie viel Speicherplatz haben Sie noch frei?"),
        Message(request_id=5, user_id=5, message_text="Wie sehe ich das denn?"),
        Message(request_id=5, user_id=3, message_text="Gehen Sie in die Einstellungen und dann auf 'Speicher'. Dort steht, wie viel Platz noch frei ist."),
    ]
    
    for m in messages:
        await create_message(m)
        
    print("Test Messages created")


#on_event is deprecated but should still work, otherwise use "lifespan"; just ignore it
# @app.on_event("startup") 
# async def startup():
    # await resetDB()
    # await testUserData()
    # await testRequestData()
    # await testMessageData()



""" # favicon
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    from fastapi.responses import FileResponse
    return FileResponse("favicon.ico", media_type="image/x-icon")

# Image endpoint for frontend usage
@app.get("/images/{image_name}", include_in_schema=False)
async def get_image(image_name: str):
    from fastapi.responses import FileResponse
    import mimetypes
    
    # Security: only allow files from images folder
    if ".." in image_name:
        raise HTTPException(status_code=400, detail="Invalid image name")
    
    file_path = f"images/{image_name}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    
    mime_type, _ = mimetypes.guess_type(file_path)
    return FileResponse(file_path, media_type=mime_type) """