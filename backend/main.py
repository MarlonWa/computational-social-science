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
    helper_id: int = 0
    title: str = ""
    text: str = ""
    status: str = "open"

class Chat(BaseModel):
    chat_id: int = 0
    helper_id: int = 0
    help_id : int = 0
    request_id: int = 0
    
class Message(BaseModel):
    message_id: int = 0
    chat_id: int = 0
    user_id: int = 0
    message_text : str = ""

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

#POST User 
@app.post("/user")
#creates a new user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def create_user(user: User):
    conn = get_db_connection()
    try: 
        conn.execute("INSERT INTO users (name, email, password, address, helper, points) VALUES (?, ?, ?, ?, ?, ?)", 
                 (user.name, user.email, user.password, user.address, user.helper,user.points))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError: 
        conn.close()
        raise HTTPException(status_code=409, detail="Email already used")

@app.post("/login")
#login user, returns HTTPStatus.ACCEPTED on success, HTTPStatus.CONFLICT on failure
async def login(user: User):
    conn = get_db_connection()
    result = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", 
                          (user.email, user.password,)).fetchone()
    conn.close()
    if(result):
        return 
    else:
        raise HTTPException(status_code=409, detail="Invalid Login")

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
    try: 
        conn.execute("INSERT INTO requests (user_id, title, text) VALUES (?, ?, ?)", 
                 (request.user_id, request.title, request.text,))
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


#CHAT DATA
#GET chat 
@app.get("/chats")
#returns all chats from table "chats"
async def get_chats():
    conn = get_db_connection()
    chat = conn.execute("SELECT * FROM chats").fetchall()
    conn.close()
    return [dict(r) for r in chat]
    
@app.get("/chat/{chat_id}")
#returns a chat from table "chats" by chat_id, returns HTTPStatus.NOT_FOUND if not found
async def get_chat(chat_id: int):
    conn = get_db_connection()
    chat = conn.execute("SELECT * FROM chats WHERE chat_id = ?", (chat_id,)).fetchone()
    conn.close()
    if(chat):
        return dict(chat)
    else: 
        raise HTTPException(status_code=404, detail="chat not found")
    
@app.get("/user/{user_id}/chats")
#returns all chats from a specific creator (user_id)
async def get_user_chats(user_id: int):
    conn = get_db_connection()
    chat = conn.execute("SELECT * FROM chats WHERE helper_id = ? OR help_id = ?", (user_id, user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in chat]

#POST chat
@app.post("/chat")
#creates a new chat in table "chats", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def create_chat(chat: Chat):
    conn = get_db_connection()
    try: 
        conn.execute("INSERT INTO chats (helper_id, help_id, request_id) VALUES (?, ?, ?)", 
                 (chat.helper_id, chat.help_id, chat.request_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError: 
        conn.close()
        raise HTTPException(status_code=409, detail="chat not found")

#PUT chat
@app.put("/chat/{chat_id}")
#updates a chat in table "chats", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def update_chat(chat_id: int, chat: Chat):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE chats SET helper_id = ? WHERE chat_id = ?", 
                     (chat.helper_id, chat_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="chat not found")

#DELETE chat
@app.delete("/chat/{chat_id}")
#deletes a chat from table "chats", returns HTTPStatus.ACCEPTED
async def delete_chat(chat_id: int):
    conn = get_db_connection()
    chat = conn.execute("DELETE FROM chats WHERE chat_id = ?", (chat_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED


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

@app.get("/message/chat/{chat_id}")
#returns a message from table "messages" by message_id, returns HTTPStatus.NOT_FOUND if not found
async def get_chat_message(chat_id: int):
    conn = get_db_connection()
    message = conn.execute("SELECT * FROM messages WHERE chat_id = ?", (chat_id,)).fetchall()
    conn.close()
    if(message):
        return [dict(r) for r in message]
    else: 
        raise HTTPException(status_code=404, detail="message not found")

#POST message
@app.post("/message")
#creates a new message in table "messages", returns HTTPStatus.CREATED on success, HTTPStatus.CONFLICT on failure
async def create_message(message: Message):
    conn = get_db_connection()
    try: 
        conn.execute("INSERT INTO messages (chat_id, user_id, message_text) VALUES (?, ?, ?)", 
                 (message.chat_id, message.user_id, message.message_text,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
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
    message = conn.execute("DELETE FROM messages WHERE message_id = ?", (message_id,)).fetchone()
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
    points = conn.execute("SELECT points FROM users WHERE user_id = ?", (user_id,)).fetchone()
    rank = conn.execute("SELECT rank FROM (SELECT user_id, ROW_NUMBER() OVER (ORDER BY points DESC) AS rank FROM users) WHERE user_id = ?", (user_id,)).fetchone()
    top3 = conn.execute("SELECT points FROM users ORDER BY points DESC LIMIT 3").fetchall()
    conn.close()

    if len(top3) == 1:
        top3 = [dict(top3[0]), {"points": 0}, {"points": 0}]
    elif len(top3) == 2:
        top3 = [dict(top3[0]), dict(top3[1]), {"points": 0}]
    
    return {
        "top1": top3[0]["points"],
        "top2": top3[1]["points"],
        "top3": top3[2]["points"],
        "user_score" : points["points"],
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
            chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
            helper_id INTEGER NOT NULL,
            help_id INTEGER NOT NULL,
            request_id INTEGER NOT NULL
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
            chat_id INTEGER NOT NULL,
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
        User(name="Blib", email="blibblub@hi.de", password="password", address= "testvill", helper=True, points = 100),
        User(name="Max", email="max@hi.de", password="1234", address= "Passing", helper=True, points = 20),
        User(name="Gustav", email="ub@hi.de", password="password", address= "testvill", helper=True, points = 10),
        User(name="Ella", email="ellaelli@hi.de", password="", address= "TUM", helper=False)
    ]
    #im Frontend wird zum Testen angenommen, dass ID1 ein Helfer ist und ID3 ein Hilfesuchender. Bitte nicht ändern
    
    for u in users:
        await create_user(u)
        
    print("Test Users created")

async def testRequestData():
    requests = [
        Request(user_id=1, title="Anfrage numero 1", text = "Das ist ne Anfrage. yay"),
        Request(user_id=1, title="Anfrage numero 2", text = "blib blub yay"),
        Request(user_id=3, title="Anfrage numero 3", text = "Auch eine Anfrage."),
        Request(user_id=2, title="Anfrage numero 4", text = "Anfrageänderung zu Testzwecken.")
    ]
    #im Frontend wird zum Testen angenommen, dass Request 1 von UserID 1 ist und Request 3 von UserID 3. Bitte nicht ändern
    
    for r in requests:
        await create_request(r)
        
    print("Test Request created")
    
async def testChatData():
    chats = [
        Chat(helper_id=1, help_id = 2, request_id = 1),
        Chat(helper_id=3, help_id = 2, request_id = 2),
    ]
    
    for c in chats:
        await create_chat(c)
        
    print("Test Chat created")

async def testMessageData():
    messages = [
        Message(chat_id=1, user_id = 2, message_text="hi"),
        Message(chat_id=1, user_id = 1, message_text="hi back"),
        
        Message(chat_id=2, user_id = 2, message_text="hello"),
        Message(chat_id=2, user_id = 3, message_text="hello back"),
    ]
    
    for m in messages:
        await create_message(m)
        
    print("Test Chat created")


#on_event is deprecated but should still work, otherwise use "lifespan"; just ignore it
# @app.on_event("startup") 
# async def startup():
    # await resetDB()
    # await testUserData()
    # await testRequestData()
    # await testChatData()
    # await testMessageData()
    
