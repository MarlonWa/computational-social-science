import User from '../class/User.js'

//FastAPI URL 
const url = "http://127.0.0.1:8000/user/"

//Get User by user_id
async function getUser(index) {
    try {
        const response = await fetch(url + index);
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

var user = await getUser(1);
user.email = "newEmail";
console.log(JSON.stringify(user));
await postUser(user);

