const url = "http://127.0.0.1:8000/user/"

function getAllUsers(){
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

function getUser(user_id){
    const responseJson = fetch(url + user_id)
}

getUser(1)
