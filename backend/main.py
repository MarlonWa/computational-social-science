from fastapi import FastAPI
from database import get_db_connection
import os
from dotenv import load_dotenv

#load environment variables like the DB name
load_dotenv()
DB_NAME = os.getenv("DB_NAME")

#start the app
app = FastAPI()

#Test method
@app.get("/")
async def hello():
    return "Hello World"

#returns all users
@app.get("/users")
def get_users():
    conn = get_db_connection()
    users = conn.execute("SELECT id, name FROM users").fetchall()
    conn.close()
    return [dict(u) for u in users]


#this creates a test users-database with two values
@app.on_event("startup") #on_event is deprecated but should still work, otherwise use "lifespan"
def startup():
    if os.path.exists(DB_NAME): #rm old DB
        os.remove(DB_NAME)

    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    """)

    conn.execute("INSERT INTO users (name) VALUES ('Test1')")
    conn.execute("INSERT INTO users (name) VALUES ('Test2')")

    conn.commit()
    conn.close()

    print("Neue DB erstellt")
