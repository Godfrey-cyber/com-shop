import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"

// DENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d"})

}
// GET USER
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, username } = req.body
	if (!email || !username || !password) {
        res.status(400)
        throw new Error("Please enter all fiedls")
    }  
	if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be more than 6 characters");
    } 
	const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("There exists a user registered with that email already")
    } 

	const newUser = await User.create({
        username,
        password,
        email
    });
    const token = generateToken(newUser._id)
	   res.cookie("token", token, {
	        path: "/",
	        httpOnly: true,
	        expires: new Date(Date.now() + 1000 * 86400),
	        sameSite: "none",
	        secure: true
	   })
	   if (newUser) {
	   	const { _id, username, bio, image, email, phone} = newUser
	   	res.status(201).json({data: {_id, username, bio, image, email, phone, token}})
	   } else {
        res.status(400)
        throw new Error("User not created, something went wrong")
    }
})

// LOGIN USER
export const loginUser = asyncHandler(async(req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		res.status(400)
		throw new Error("Please Enter all fields")
	}
	// CHECK IF USER EXISTS
	const user = await User.findOne({ email })
	if (!user) {
		res.status(400)
		throw new Error("User not found! Please sign up")
	}

	const ifPasswordIsCorrect = await bcrypt.compare(password, user.password)
	// ASSIGN A USER A TOKEN
	const token = generateToken(user._id)
       res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true
       })
       if (user && ifPasswordIsCorrect) {
       	const {_id, username, bio, image, email, phone} = user
       	res.status(200).json({data: {_id, username, bio, image, email, phone, token}})
       } else {
        res.status(400)
        throw new Error("Invalid email or password!")
    }
})
// LOGIN STATUS
export const loginStatus = asyncHandler(async(req, res) => {
    const token =  req.cookies.token
    if (!token) {
        return res.json(false)
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        res.json(true)
    } else {
        res.json(false)
    }
})
//LOGOUT USER
export const logoutUser = asyncHandler(async(req, res) => {
	res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
       })
    return res.status(200).json({message: "Successfully logged out"})
})
// GET A SINGLE USER
export const getUser = asyncHandler(async(req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
        const {_id, username, bio, image, email, phone} = user
        res.status(200).json({ data: {_id, username, bio, image, email, phone} })
    } else {
        res.status(400)
        throw new Error("User not found")
    } 
})
// GET ALL USERS 
export const getAllUsers = asyncHandler(async(req, res) => {
	const users = req.query.new ? await Users.find().sort({ createdAt: -1} ).limit(5) : await User.find()
	if (users) {
		res.status(200).json({data: users})
	} else {
		res.status(400)
		throw new Error("Something went wrong")
	}
})
// UPDATE USER
export const updateUser = asyncHandler(async(req, res) => {
	try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
 })
// DELETE USER
export const deleteUser = asyncHandler(async(req, res) => {
	try {
        const deleteUser = await User.findByIdAndDelete(req.user._id)
        res.status(200).json({message: "User successfuly deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
 })
//CHANGE PASSWORD
export const changePassword = asyncHandler(async(req, res) => {
	const user = await User.findById(req.user._id)
	const { oldPassword, password } = req.body
	if (!user) {
        throw new Error("User not found, You are not logged in, please sign up")
     }
	if(!oldPassword || !password) {
		throw new Error("Please key in old and new passwords")
	}
	const passwordMatch = await bcrypt.compare(oldPassword, user.password)
	if (passwordMatch && user) {
		user.password = password
		await user.save()
		res.status(200).json({message: "Password change successful"})
     } else {
        throw new Error("Old password is incorrect")
     }
})