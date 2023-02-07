import express from "express"
const router = express.Router()
import { createProduct, getAllProducts, updateProduct, deleteProduct, getProduct } from "../controllers/products.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/create", protect, createProduct)
router.get("/getAll", getAllProducts)
router.get("/getProduct/:id", getProduct)
router.put("/update/:id", protect, updateProduct)
router.delete("/delete/:id", protect, deleteProduct)

export default router