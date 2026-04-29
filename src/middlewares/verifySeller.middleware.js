import ApiError from "../utility/ApiError.js";
import jwt from "jsonwebtoken";

const verifySeller = (req, res, next) => {
  try {
    let accessToken = req.headers.authorization;

    if (!accessToken) throw new ApiError(402, "Invalid Access Token");

    accessToken = accessToken.split(" ")[1];

    const decodedJWT = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);

    req.user = decodedJWT;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default verifySeller;