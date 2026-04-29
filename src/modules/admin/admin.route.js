import { Router } from "express";
import { createSeller, createTokenForAdmin, getSellerEntries } from "./admin.controller.js";
import validateRequest from "../../middlewares/req_body_validation.middleware.js";
import adminLoginSchema, { sellerCreationSchema } from "./admin.validation.js";
import checkIfUserIsAdmin from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", validateRequest(adminLoginSchema) ,createTokenForAdmin);

router.post("/create_seller", checkIfUserIsAdmin ,validateRequest(sellerCreationSchema), createSeller);

router.get("/sellers", checkIfUserIsAdmin, getSellerEntries);


export default router;