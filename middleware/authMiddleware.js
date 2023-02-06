import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = asyncHandler(async(req, res, next) => {
	try {
		const token = req.cookies.token
		if (!token) {
			res.status(401)
			throw new Error("Not authorized please login")
		} 
		//verify token
		const verified = jwt.verify(token, process.env.JWT_SECRET)
		//get user from token
		const user = await User.findById(verified.id).select("-password")
		if (!user) {
			res.status(401)
			throw new Error("User not found")
		}
	
		req.user = user
		next()
	} catch (err) {
		res.status(401)
		throw new Error("User not authorized please login")
	}
})