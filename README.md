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
        - get_users()
            returns all users in the database
        - get_user(user_id)
            takes a int path variable
            returns user with the same user_id
            returns HTTPStatus.NOT_FOUND if user doesn't exist
        - create_user(user)
            takes a JSON body with a new user
            returns HTTPStatus.CREATED if added to database 
            returs HTTPStatus.BAD_REQUEST if email already exist
        -login(user)
            


