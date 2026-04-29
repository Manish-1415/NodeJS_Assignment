import ApiError from "../utility/ApiError.js";

const erroMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res
  .status(statusCode)
  .json(new ApiError(statusCode, message));
};

export default erroMiddleware;
