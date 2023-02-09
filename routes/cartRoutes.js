import express from "express"
const router = express.Router()
import { createCart, getAllCarts, updateCart, deleteCart, getUserCart } from "../controllers/cart.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/create", protect, createCart)
router.get("/getAll", getAllCarts)
router.get("/getUserCart/:id", getUserCart)
router.put("/update/:id", protect, updateCart)
router.delete("/delete/:id", protect, deleteCart)

export default router
