import express from "express"
const router = express.Router()

import { registerUser, loginUser, logoutUser } from "../controllers/users.js"

router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)
router.get("/auth/logout", logoutUser)

export default router