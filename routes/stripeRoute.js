import express from "express"
const router = express.Router()
import { chargeClient } from "../controllers/payment.js"


router.post("/payment", chargeClient)
export default router