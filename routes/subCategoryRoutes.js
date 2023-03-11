import express from "express"
const router = express.Router()
import { getAllSubCategories, createSubCategory, updateSubCategory, deleteSubCategory } from "../controllers/subCategories.js"
import { protect } from "../middleware/authMiddleware.js"

router.get("/getAll", getAllSubCategories)
router.post("/create", protect, createSubCategory)
router.put("/update/:id", protect, updateSubCategory)
router.delete("/delete/:id", protect, deleteSubCategory)

export default router