
class ApiResponse {
    constructor(statusCode, message, response) {

        this.statusCode = statusCode;
        this.message = message;
        this.response = response;
    }
}

export default ApiResponse;