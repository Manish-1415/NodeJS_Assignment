class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.message = message; // Force the message to be an "own property"
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
