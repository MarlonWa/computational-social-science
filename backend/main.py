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

#load environment variables like the DB name
load_dotenv()
DB_NAME = os.getenv("DB_NAME")

#start the app
app = FastAPI()

#Default Endpoint
@app.get("/")
async def hello():
    return "Hello World"

#GET User 
@app.get("/users")
def get_users():
    conn = get_db_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(u) for u in users]

@app.get("/user/{user_id}")
def get_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("SELECT first_name, last_name, email FROM users WHERE user_id = ?", (user_id,)).fetchone()
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
        conn.execute("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", 
                 (user.first_name, user.last_name, user.email, user.password,))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError: 
        conn.close()
        return HTTPStatus.IM_USED

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
        conn.execute("UPDATE users SET first_name = ?, last_name = ?, email = ? password = ? WHERE user_id = ?", 
                     (user.first_name, user.last_name, user.email, user.password, user_id))
        conn.commit()
        conn.close()
        return HTTPStatus.CREATED
    except IntegrityError:
        conn.close()
        return HTTPStatus.IM_USED

#DELETE user
@app.delete("/user/{user_id}")
def delete_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute("DELETE FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.commit()
    conn.close()
    return HTTPStatus.ACCEPTED
    

def createDB():
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
        conn = get_db_connection()

        conn.execute("""
            CREATE TABLE users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        """)

        conn.commit()
        conn.close()

        print("Neue DB erstellt")

@app.on_event("startup") #on_event is deprecated but should still work, otherwise use "lifespan"
def startup():
    if os.path.exists(DB_NAME) == False: #rm old DB
        createDB()
    else:
        print("Start DB")
    
