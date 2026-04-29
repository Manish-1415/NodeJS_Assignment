import ApiError from "../../utility/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../admin/user.model.js";
import { Product } from "./product.model.js";

const sellerService = {
  sellerToken: async (sellerInfoObj) => {
    let user = await User.findOne({ email: sellerInfoObj.email });

    if (!user) throw new ApiError(404, "User not Found or Invalid Credentials");

    const checkUserPass = await user.correctPassword(
      sellerInfoObj.password,
      user.password
    );

    if (!checkUserPass) throw new ApiError(403, "Invalid Credentials");

    const payload = {
      email: sellerInfoObj.email,
      name: user.name,
      role: user.role,
      id: user._id,
    };

    const secret = process.env.ACCESS_SECRET_KEY;

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  },

  addProductEntry: async (productInfoObj, sellerId) => {
    const newProduct = await Product.create({
      ...productInfoObj,
      sellerId,
    });

    return newProduct;
  },

  getProductsForSeller: async (page, limit, sellerId) => {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find({ sellerId })
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }), // Newest first
      Product.countDocuments({ sellerId }),
    ]);

    return { products, total, page, totalPages: Math.ceil(total / limit) };
  },

  getSpecificProductEntry: async (productId, sellerId) => {
    const product = await Product.findOne({
      _id: productId,
      sellerId,
    });

    if (!product) throw new ApiError(404, "Product Not found");

    if (product.sellerId.toString() !== sellerId)
      throw new ApiError(
        403,
        "User is not Authorized to Perform this Operation"
      );

    const totalPrice = product.brands.reduce(
      (sum, brand) => sum + brand.price,
      0
    );

    return {
      product,
      totalPrice,
    };
  },

  deleteProductEntry: async (productId, sellerId) => {
    const product = await Product.findOne({ _id: productId });

    if (!product) throw new ApiError(404, "Product Not Found");

    if (product.sellerId.toString() !== sellerId)
      throw new ApiError(403, "User cannot perform this Operation");

    await product.deleteOne();

    return {
      product: productId,
      message: "Product Deleted",
    };
  },
};

export default sellerService;
