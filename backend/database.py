import sqlite3
import os
from dotenv import load_dotenv

#load DB NAME
load_dotenv()
DB_NAME = os.getenv("DB_NAME")

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn