class User{
    constructor(JSON_Object){
        this.user_id = JSON_Object.user_id;
        this.first_name = JSON_Object.first_name;
        this.last_name = JSON_Object.last_name;
        this.email = JSON_Object.email;
        this.password = JSON_Object.password;
        this.address = JSON_Object.address;
        this.helper = (JSON_Object.helper == 1);
    }

    noId(){
        return {
            first_name : this.first_name,
            last_name : this.last_name,
            email : this.email,
            password : this.password,
            address : this.address,
            helper : this.helper
        }
    }
}

export default User;