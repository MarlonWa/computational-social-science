COMPUTATIONAL SOCIAL SCIENCE

About the Project:
This will be our submission for the seminar "Computational Social Science" as part of the TUM project week 2025/2026.
You can find further information as well as documentation in this document.

Documentation:
Frontend:

Backend:
- main.py
    - Discription: 
        FastApi Application, that accesses the SQLite Database.
        Database saves a table for requests and users.
        Contains all basic CRUD methodes fo both users and request.
    - BaseModels:
        - User:
            - user_id
            - first_name
            - last_name
            - email
            - password 
            - addresse
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
            


