import express from "express";
import { getAllProducts, getProducts, createProduct, getSingleProduct  } from "../controllers/product.controller.js";
import { validateToken} from "../controllers/auth.controller.js";
var router = express.Router();

/* GET products listing. */
router.get("/products",getAllProducts);

router.param("productId", getSingleProduct);

/* POST add a new product. */
router.post("/products", validateToken, createProduct);

/* GET single prdoduct  */
router.get("/product/:productId", validateToken, getProducts);

export default router;
