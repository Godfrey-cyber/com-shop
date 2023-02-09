import express from "express"
const router = express.Router()
import { createOrder, getAllOrders, updateOrder, deleteOrder, getUserOrder, getIncomeStats } from "../controllers/order.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/create", protect, createOrder)
router.get("/getAll", getAllOrders)
router.get("/getUserOrder/:id", getUserOrder)
router.put("/update/:id", protect, updateOrder)
router.delete("/delete/:id", protect, deleteOrder)
router.get("/getIncomeStats", protect, getIncomeStats)

export default router
