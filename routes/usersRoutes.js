import express from "express"
const router = express.Router()
import { loginStatus, getUser, getAllUsers, updateUser, deleteUser, changePassword } from "../controllers/users.js"
import { protect } from "../middleware/authMiddleware.js"

router.get("/fetchUser", protect, getUser)
router.get("/fetchAllUsers", getAllUsers)
router.put("/update", protect, updateUser)
router.get("/loggedin", loginStatus)
router.delete("/delete", protect, deleteUser)
router.patch("/changePassword", protect, changePassword)
// router.patch("/forgotPassword", forgotPassword)
// router.delete("/delete/:id", deleteUser)
// router.put("/resetPassword/:resetToken", resetPassword)

export default router