import express from "express";
import { validateToken } from "../controllers/auth.controller.js";
import { getUserCartItems, createCartItem } from "../controllers/cart.controller.js";

var router = express.Router();

// router.param("userId", getSingleUserCartItems);
router.get("/cart/:userId",validateToken, getUserCartItems);
router.post("/cart", validateToken,createCartItem);

export default router;
