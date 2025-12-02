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
    if(user):
        return user
    else: 
        return HTTPStatus.NOT_FOUND

#POST User 
@app.post("/user")
#creates a new user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.BAD_REQUEST on failure (e.g. email already exists)
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
#login user, returns HTTPStatus.ACCEPTED on success, HTTPStatus.BAD_REQUEST on failure
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
#updates a user in table "users", returns HTTPStatus.CREATED on success, HTTPStatus.BAD_REQUEST on failure
def update_user(user_id: int, user: User):
    conn = get_db_connection()
    try:
        conn.execute("UPDATE users SET first_name = ?, last_name = ?, email = ? password = ?, address = ?, helper = ? WHERE user_id = ?", 
                     (user.first_name, user.last_name, user.email, user.password, user.address, user.helper, user_id))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        return HTTPStatus.BAD_REQUEST

#DELETE user
@app.delete("/user/{user_id}")
#deletes a user from table "users", returns HTTPStatus.ACCEPTED
def delete_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("DELETE FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED


#REQUEST DATA
#GET request 
@app.get("/request")
#returns all requests from table "requests"
def get_requests():
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests").fetchall()
    conn.close()
    return [dict(r) for r in request]

@app.get("/request/{request_id}")
#returns a request from table "requests" by request_id, returns HTTPStatus.NOT_FOUND if not found
def get_request(request_id: int):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE request_id = ?", (request_id,)).fetchone()
    conn.close()
    if(request):
        return request
    else: 
        return HTTPStatus.NOT_FOUND
    
@app.get("/user/requests/")
#returns all requests from a specific user
def get_user_requests(user: User):
    conn = get_db_connection()
    request = conn.execute("SELECT * FROM requests WHERE user_id = ?", (user.id,)).fetchall()
    conn.close()
    return [dict(r) for r in request]

#POST User 
@app.post("/request")
#creates a new request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.IM_USED on failure
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
#updates a request in table "requests", returns HTTPStatus.CREATED on success, HTTPStatus.IM_USED on failure
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
#deletes a request from table "requests", returns HTTPStatus.ACCEPTED
def delete_request(request_id: int):
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
    #create table requests
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