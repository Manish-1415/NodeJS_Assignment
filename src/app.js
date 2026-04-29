import express from "express";

import adminRouter from "./modules/admin/admin.route.js"
import sellerRouter from "./modules/seller/seller.route.js"
import erroMiddleware from "./middlewares/error_middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/seller", sellerRouter);

app.use(erroMiddleware);

export default app;