import User from '../class/User.js'
import Request  from '../class/Request.js';

//FastAPI URL 
const url = "http://127.0.0.1:8000/user/"

//Get User by user_id
async function getUser(id) {
    try {
        const response = await fetch(url + id, {method: "GET"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const user = new User(result)
        return user;
    } catch (error) {
        console.error(error.message);
    }
}

//Get all Users
async function getAllUsers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const users = []

        for(var i = 0; i < result.length; i++){
            users.push(new User(result[i]))
        }
        
        return users;
    } catch (error) {
        console.error(error.message);
    }
}

//Create new User
async function postUser(user) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (error) {
        console.error(error.message);
    }
}

//Update User
async function putUser(id, user) {
    try {
        const response = await fetch(url + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (error) {
        console.error(error.message);
    }
}

//Delete User
async function deleteUser(id) {
    try {
        const response = await fetch(url + id, {method: "DELETE"});

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

//Get all Requests from User by user_id
async function getAllUserRequest(id){
    try {
        const response = await fetch(url + id + "/requests");

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const requests = []

        console.log(result);

        for(var i = 0; i < result.length; i++){
            requests.push(new Request(result[i]))
        }
        
        return requests;
    } catch (error) {
        console.error(error.message);
    }
}

export default UserService;