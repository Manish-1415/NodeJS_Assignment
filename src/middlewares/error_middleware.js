import ApiError from "../utility/ApiError.js";

const erroMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.log("Error Logged in Middleware:", err);

  // STOP creating a 'new ApiError' here.
  // Just send a plain JavaScript object.
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
};

export default erroMiddleware;
