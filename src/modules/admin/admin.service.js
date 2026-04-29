import ApiError from "../../utility/ApiError.js";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";

const adminService = {
  adminLogin: async (adminInfoObj) => {
    const findIfUserIsAdmin = await User.findOne({ email: adminInfoObj.email });

    if (!findIfUserIsAdmin) throw new ApiError(401, "Invalid Credentials");

    const checkForPass = await findIfUserIsAdmin.correctPassword(
      adminInfoObj.password,
      findIfUserIsAdmin.password
    );

    if (!checkForPass || findIfUserIsAdmin.role !== "admin")
      throw new ApiError(
        403,
        "User is Not Authorized to Perform this Operation"
      );

    const payload = {
      name: findIfUserIsAdmin.name,
      email: findIfUserIsAdmin.email,
      role: findIfUserIsAdmin.role,
      id: findIfUserIsAdmin._id,
    };

    const secret = process.env.ACCESS_SECRET_KEY;

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    return { accessToken, role: findIfUserIsAdmin.role };
  },

  sellerCreation: async (sellerInfoObj) => {
    const seller = await User.findOne({ email: sellerInfoObj.email });
  
    if (seller)
      throw new ApiError(
        400,
        "Seller already exist, Please Provide valid Credentials"
      );

    const newSeller = await User.create({ ...sellerInfoObj, role: "seller" });

    return newSeller;
  },

  getSellers: async (page, limit) => {
    const skip = (page - 1) * limit;

    const [sellers, totalCount] = await Promise.all([
      User.find({ role: "seller" })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      User.countDocuments({role : "seller"}),
    ]);

    if (sellers.length == 0) return [];

    return {
      data: sellers,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  },
};

export default adminService;
