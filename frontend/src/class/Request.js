class Request {
    constructor(JSON_Object) {
        this.request_id = JSON_Object.request_id ?? 0;
        this.user_id = JSON_Object.user_id ?? 0;
        this.title = JSON_Object.title ?? "";
        this.text = JSON_Object.text ?? "";
    }
}

export default Request;