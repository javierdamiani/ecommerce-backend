// Import de Router desde express
import { Router } from "express";

const router = Router();

import ProductController from "../controllers/product.js";

router.get("/", ProductController.getProducts);
router.post("/create", ProductController.createProduct);

export default router;
