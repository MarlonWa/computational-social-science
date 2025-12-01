from fastapi import FastAPI
from database import get_db_connection
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from sqlite3 import IntegrityError
from http import HTTPStatus

class User(BaseModel):
    first_name: str
    last_name: str
    email : str
    password : str
    address: str = ""
    helper: bool = False

class Request(BaseModel):
    user_id : int
    title: str
    text: str = ""

#load environment variables like the DB name
load_dotenv()
DB_NAME = os.getenv("DB_NAME")

#start the app
app = FastAPI()
app.add

#Default Endpoint
@app.get("/")
async def hello():
    return "Hello World"

#USER DATA
#GET User 
@app.get("/user")
async def get_users():
    conn = get_db_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(u) for u in users]

@app.get("/user/{user_id}")
async def get_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    if(user):
        return user
    else: 
        return HTTPStatus.NOT_FOUND

#POST User 
@app.post("/user")
def create_user(user: User):
    conn = get_db_connection()
    try: 
        conn.execute("INSERT INTO users (first_name, last_name, email, password, address, helper) VALUES (?, ?, ?, ?, ?, ?)", 
                 (user.first_name, user.last_name, user.email, user.password, user.address, user.helper,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError: 
        conn.close()
        return HTTPStatus.BAD_REQUEST

@app.post("/login")
def login(user: User):
    conn = get_db_connection()
    result = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", 
                          (user.email, user.password,)).fetchone()
    conn.close()
    if(result):
        return HTTPStatus.ACCEPTED
    else:
        return HTTPStatus.BAD_REQUEST

#PUT user
@app.put("/user/{user_id}")
def update_user(user_id: int, user: User):
    conn = get_db_connection()
    try:
<<<<<<< HEAD
        conn.execute("UPDATE users SET first_name = ?, last_name = ?, email = ? password = ?, address = ?, helper = ? WHERE user_id = ?", 
                     (user.first_name, user.last_name, user.email, user.password, user.address, user.helper, user_id))
=======
        conn.execute("UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?", 
                     (user.first_name, user.last_name, user.email, user.password, user_id))
>>>>>>> 216ca55a16c90da473278b18581308b6005620a1
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        return HTTPStatus.BAD_REQUEST

#DELETE user
@app.delete("/user/{user_id}")
def delete_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("DELETE FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED


#REQUEST DATA
#GET request 
@app.get("/request")
def get_request():
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests").fetchall()
    conn.close()
    return [dict(r) for r in request]

@app.get("/request/{request_id}")
def get_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.close()
    if(request):
        return request
    else: 
        return HTTPStatus.NOT_FOUND
    
@app.get("/userRequests/{user_id}")
def get_user_requests(user_id: int):
    print("test")
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE user_id = ?", (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in request]

#POST User 
@app.post("/request")
def create_request(request: Request):
    conn = get_db_connection()
    try: 
        conn.execute("INSERT INTO requests (user_id, title, text) VALUES (?, ?, ?)", 
                 (request.user_id, request.title, request.text,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError: 
        conn.close()
        return HTTPStatus.IM_USED

#PUT request
@app.put("/request/{request_id}")
def update_request(request_id: int, request: Request):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE requests SET title = ?, text = ? WHERE request_id = ?", 
                     (request.title, request.text, request_id,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        return HTTPStatus.IM_USED

#DELETE request
@app.delete("/request/{request_id}")
def delete_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("DELETE FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED


#SETUP DB
def createDB():
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
    
    createUserTable()
    createRequestTable()

    print("Neue DB erstellt")

def createUserTable():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            helper BOOLEAN
        );
    """)

    conn.commit()
    conn.close()

    print("Neue User erstellt")

def createRequestTable():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE requests (
            request_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            text VARCHAR(255)
        );
    """)

    conn.commit()
    conn.close()

    print("Neue Request erstellt")

#TEST DATA
def testUserData():
    user1 = User(first_name="Blib", last_name="Blub", email="blibblub@hi.de", password="password", address= "testvill", helper=True)
    user2 = User(first_name="Max", last_name="Mustermann", email="max@hi.de", password="1234", address= "Passing", helper=True)
    user3 = User(first_name="Ella", last_name="Elli", email="ellaelli@hi.de", password="", address= "TUM", helper=False)
    users = [user1, user2, user3]
    for u in users:
        create_user(u)
    print("Test Users created")

def testRequestData():
    create_request(Request(user_id=1, title="Hello Wolrd", text = "hi hi hi"))
    create_request(Request(user_id=1, title="Hello Wolrd", text = "hiho"))
    create_request(Request(user_id=2, title="Hello Wolrd", text = "hallo"))
    create_request(Request(user_id=3, title="Hello Wolrd", text = ""))
    print("Test Request created")


#on_event is deprecated but should still work, otherwise use "lifespan"; just ignore it
@app.on_event("startup") 
def startup():
    createDB()
    testUserData()
    testRequestData()