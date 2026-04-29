import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "express-async-handler";
import adminService from "./admin.service.js";


export const createTokenForAdmin = asyncHandler(async (req, res) => {
    const adminInfoObj = req.body;

    const admin = await adminService.adminLogin(adminInfoObj);

    return res
    .status(200)
    .json(new ApiResponse(200, "Admin Login Successfull", admin));
})


export const createSeller = asyncHandler(async (req, res) => {
    const sellerInfoObj = req.body;

    const seller = await adminService.sellerCreation(sellerInfoObj);

    return res
    .status(201)
    .json(new ApiResponse(201, "Seller Create Successfully", seller));
})


export const getSellerEntries = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let sellers = await adminService.getSellers(page, limit);

    return res
    .status(200)
    .json(new ApiResponse(200, "Sellers Fetched Successfully", sellers));
})