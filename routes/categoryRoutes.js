import express from "express"
const router = express.Router()
import { createCategory, updateCategory, deleteCategory, getAllCategories, getCategory } from "../controllers/category.js"
import { protect } from "../middleware/authMiddleware.js"
router.get("/getAll", getAllCategories)
router.get("/getCategory/:id", getCategory)
router.post("/create", protect, createCategory)
router.put("/update/:id", protect, updateCategory)
router.delete("/delete/:id", protect, deleteCategory)

export default router