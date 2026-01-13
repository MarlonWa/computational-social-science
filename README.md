# COMPUTATIONAL SOCIAL SCIENCE

## About the Project:

This will be our submission for the seminar "Computational Social Science" as part of the TUM project week 2025/2026.
You can find further documentation on backend and frontend further below in this document.

## Documentation:

### Frontend:

#### Idea: 
The helper side is allowed to have a more complicated UI, since it's being used by younger and digitally more advanced people. The help-seeking side is designed with big font sizes, not a lot of buttons and very intuitive design. It should be easy for elderly people or people with not a lot of digital know-how to navigate here and use it.

#### A list of all pages:

- Home: Users will be on this page when they initially go onto our website

- Helfer_Login / Hilfe_Login: Our Login pages for either the helper side or the help-seeking side. One account can only log into one of these.

- Helfer_SignUp / Hilfe_SignUp: Our Signup pages. Users can create an account here by inserting a name, email and password.

- Helfer_Home: The main page for helpers. Here they can go to their chats, open requests, requests currently in work and the scoreboard. In the future, they will also be able to go to their profile here.

- Helfer_Requests_All: Shows all open requests for help. Users can then click on them to get a detailed view or go back to their home.

- Helfer_Request_Details: A detailed view of a request from "All requests". Users can accept a request here and then work on it.

- Helfer_Requests_Assigned: Shows all requests currently in work by this user. Users can then click on them to get a detailed view.

- Helfer_Request_Assigned_Details: Detailed view of a request currently being worked on. Possibility to go to a chat, to finish the request or to not work on it anymore. 

- Helfer_Scoreboard: A scoreboard with points. Points are given for finishing requests. This is an incentive for helpers to work on requests.

- Helfer_Chats_All: An overview of chats for helpers. Chats are only shown if request isnt closed and if there's at least one message

- Helfer_Chat: One specific chat. Helper and Help-seeking can chat here.

- Hilfe_Home: The starting page for help-seeking users. They can create a new request, take a look at the FAQ and see their old requests.

- Hilfe_Request_New: Write a new request. The user inserts a title and description.

- Hilfe_Request_Details: A detailed view of a request. Shows title and description and lets the user go to the chat

- Hilfe_Chats_All: All open chats. Chats are only shown if request isnt closed and if there's at least one message

- Hilfe_Chat:  One specific chat. Help-seeking and helper can chat here.

- Dev: Development page. Includes links to most pages for quick access and a button to reset the database.

- FAQ: Frequently asked questions/answers and tutorials. This is supposed to assist the helpers and take some load off them.

- Datenschutz: Best practice for websites to have this. No real data in it yet though.

- Impressum: Best practice for websites to have this. No real data in it yet though.

- Header / Footer: Bar at the top/bottom of every page for uniformity. Header provides Links to go back and describes the current page, Footer contains links to the FAQ, Impressum and Datenschutz.

### Backend:

- requirementsPip.txt: Required dependencies used by the Python package manager for our project.

- database.py: Creates and returns an sqlite3 database connection using the DB_NAME environment variable

- main.py: FASTAPI backend for a simple web application connecting those needing help on digital questions and those able to offer it. Exposes CRUD HTTP endpoints for users, requests, chats, messages, scoreboards, and helper assignments. Includes DB initialisation and test data, backed by an SQLite database. Please see comments in main.py for code-level documentation. 