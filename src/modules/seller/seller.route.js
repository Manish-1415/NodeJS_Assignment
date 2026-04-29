import { Router } from "express";

import {addProduct, deleteSpecificProduct, generateProductPDF, sellerLogin, getProducts} from "../seller/seller.controller.js"
import verifySeller from "../../middlewares/verifySeller.middleware.js";
import validateRequest from "../../middlewares/req_body_validation.middleware.js";
import { addProductSchema } from "./product.validation.js";

const router = Router();

router.post("/login", sellerLogin);

router.post("/add_product", verifySeller, validateRequest(addProductSchema) ,addProduct);

router.get("/products", verifySeller,getProducts);

router.get("/get_product/:id", verifySeller ,generateProductPDF);

router.delete("/delete_product/:id", verifySeller, deleteSpecificProduct);


export default router;