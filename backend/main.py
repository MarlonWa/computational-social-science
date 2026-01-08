import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_connection
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from sqlite3 import IntegrityError
from http import HTTPStatus

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
    user_id : int
    title: str = ""
    text: str = ""

#load environment variables like the DB name
load_dotenv()
DB_NAME = os.getenv("DB_NAME")

#start the app
app = FastAPI()

#allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
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
@app.get("/user")
#returns all users from table "users"
async def get_users():
    conn = get_db_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(u) for u in users]

@app.get("/user/{user_id}")
#returns a user from table "users" by user_id
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
#creates a new user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.BAD_REQUEST on failure (e.g. email already exists)
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
#login user, returns HTTPStatus.ACCEPTED on success, HTTPStatus.BAD_REQUEST on failure
async def login(user: User):
    conn = get_db_connection()
    result = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", 
                          (user.email, user.password,)).fetchone()
    conn.close()
    if(result):
        return HTTPStatus.ACCEPTED
    else:
        raise HTTPException(status_code=409, detail="Email already used")

#PUT user
@app.put("/user/{user_id}")
#updates a user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.BAD_REQUEST on failure
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
@app.get("/request")
#returns all requests from table "requests"
async def get_requests():
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests").fetchall()
    conn.close()
    return [dict(r) for r in request]

@app.get("/request/{request_id}")
#returns a request from table "requests" by request_id, returns HTTPStatus.NOT_FOUND if not found
async def get_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.close()
    if(request):
        return request
    else: 
        raise HTTPException(status_code=409, detail="Request not found")
    
@app.get("/user/{user_id}/requests")
#returns all requests from a specific creator (user_id)
async def get_user_requests(user_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE user_id = ?", (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in request]

#POST User 
@app.post("/request")
#creates a new request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.IM_USED on failure
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
#updates a request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.IM_USED on failure
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

#DELETE request
@app.delete("/request/{request_id}")
#deletes a request from table "requests", returns HTTPStatus.ACCEPTED
async def delete_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("DELETE FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED


#SETUP DB
def createDB():
    #delete old DB if exists
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
    
    createUserTable()
    createRequestTable()

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
            text VARCHAR(255)
        );
    """)

    conn.commit()
    conn.close()

    print("Neue Request erstellt")

#TEST DATA
async def testUserData():
    users = [
        User(name="Blib", email="blibblub@hi.de", password="password", address= "testvill", helper=True, points = 10),
        User(name="Max", email="max@hi.de", password="1234", address= "Passing", helper=True, points = 20),
        User(name="Ella", email="ellaelli@hi.de", password="", address= "TUM", helper=False)
    ]
    #im Frontend wird zum Testen angenommen, dass ID1 ein Helfer ist und ID3 ein Hilfesuchender. Bitte nicht ändern
    
    for u in users:
        await create_user(u)
        
    print("Test Users created")

async def testRequestData():
    requests = [
        Request(user_id=1, title="Hello Wolrd", text = "hi hi hi"),
        Request(user_id=1, title="Hello Wolrd", text = "hiho"),
        Request(user_id=3, title="Hello Wolrd", text = ""),
        Request(user_id=2, title="Hello Wolrd", text = "hallo")
    ]
    #im Frontend wird zum Testen angenommen, dass Request 1 von UserID 1 ist und Request 3 von UserID 3. Bitte nicht ändern
    
    for r in requests:
        await create_request(r)
        
    print("Test Request created")


#on_event is deprecated but should still work, otherwise use "lifespan"; just ignore it
@app.on_event("startup") 
async def startup():
    createDB()
    await testUserData()
    await testRequestData()




# -----------------------------------------------------------------
# TODO: Methoden für frontend bitte implementieren :)
@app.get("/scoreboard/{user_id}")
async def get_scoreboard_status(user_id: int):
    # wir haben die /user/{user_id} methode bisschen verändert von der response her, weil wir eine json antwort brauchen
    # hier brauchen wir bitte die punkte der top3 user und außerdem den rang des aktuellen users
    return {"first" : 0,
            "second" : 0,
            "third" : 0,
            "user_rank" : 1
            }

# TODO: bitte noch endpoints zu /users und /requests ändern

#TODO: bitte noch zu requests einen boolean "completed" oder "done" oder so hinzufügen, nach dem wir in "meine anfragen" filtern können

#TODO: in der request table braucht es eine methode
@app.get("/helper/{helper_id}/requests") 
async def get_requests_by_helper(helper_id: int):
    return []  # return dict of requests assigned to helper

#TODO: assigns helper_id to request
#TODO: check if helperid exists and is a helper
@app.put("/helper/{helper_id}/{request_id}")
async def update_helper_for_request(helper_id: int, request_id: int):
    return {"status": "accepted"}  # return acceptance status

#TODO: unassigns helper_id from request, set to NULL
#TODO: check if helperid exists and is a helper and was assigned to request
@app.delete("/helper/{helper_id}/{request_id}")
async def delete_helper_for_request(helper_id: int, request_id: int):
    return {"status": "deleted"}  # return deletion status