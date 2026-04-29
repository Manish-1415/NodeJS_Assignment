import ApiError from "../utility/ApiError.js";
import jwt from "jsonwebtoken";

const checkIfUserIsAdmin = (req, res, next) => {
    try {
        let accessToken = req.headers.authorization;

        if(!accessToken) throw new ApiError(400, "Provide Valid Access Token");

        accessToken = accessToken.split(' ')[1];

        const user = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);

        if(user.role != "admin") throw new ApiError(403, "User is Unauthorized to perform this Operation");

        req.user = user;
        next(); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default checkIfUserIsAdmin;