COMPUTATIONAL SOCIAL SCIENCE

About the Project:
This will be our submission for the seminar "Computational Social Science" as part of the TUM project week 2025/2026.
You can find further documentation on backend and frontend further below in this document.

Documentation:
Frontend:

Backend:
- main.py
    - Description: 
        FastApi application that accesses the SQLite database.
        Database contains tables "requests" and "users".
        Supports all basic CRUD operations for both "users" and "requests".
    - BaseModels:
        - User:
            - user_id
            - first_name
            - last_name
            - email
            - password 
            - address
            - helper
        - Request:
            - request_id
            - user_id
            - title
            - text
    - Functions
        - See main.py for a description of individual functions and methods
            


