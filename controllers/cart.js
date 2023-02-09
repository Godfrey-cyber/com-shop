import asyncHandler from "express-async-handler"	
import Cart from "../models/cartModel.js"

// CREATE CART
export const createCart = asyncHandler(async(req, res) => {
	const newCart = new Cart(req.body)

	try {
		const savedCart = await newCart.save()
		res.status(201).json({ data: savedCart })
	} catch (error) {
		res.status(500).json({ message: error })
	}
})
// UPDATE CART
export const updateCart = asyncHandler(async(req, res) => {
	try {
        const updatedCart = await Cart.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true})
        res.status(200).json({data: updatedCart})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// DELETE PRODUCT
export const deleteCart = asyncHandler(async(req, res) => {
	try {
        await Cart.findByIdAndDelete(req.user._id)
        res.status(200).json({msg: "Cart has been deleted"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// GET USER CART
export const getUserCart = asyncHandler(async(req, res) => {
	try {
		const cart = await Cart.findOne(req.user._id)
        res.status(200).json({ data: cart })
	} catch (error) {
		res.status(500).json({ message: error })
	}
})
// GET ALL CART
export const getAllCarts = asyncHandler(async(req, res) => {
	try {
		// if (true) {} else {}
		const carts = await Cart.find()
        res.status(200).json({ data: carts })
	} catch (error) {
		res.status(500).json({ message: error })
	}
})