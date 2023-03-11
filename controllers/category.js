import Category from "../models/categoryModel.js"
import asyncHandler from "express-async-handler"

// CREATE A CATEGORY
export const createCategory = asyncHandler(async(req, res) => {
	const newCategory = new Category({
	    title: req.body.title,
	    desc: req.body.desc,
	    image: req.body.image,
	    name: req.body.name,
	    descImage: req.body.descImage,
    })
    if (req.user.isAdmin) {
    	const savedCategory = await newCategory.save()
        res.status(201).json({data: savedCategory})
    } else {
    	res.status(500)
    	throw new Error("You are not authorized to perform this operation")
    } 
})
// GET ALL CATEGORIES
export const getAllCategories = asyncHandler(async(req, res) => {
	try {
        const categories = await Category.find()
        res.status(200).json({data: categories})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// GET CATEGORY
export const getCategory = asyncHandler(async(req, res) => {
	const { id } = req.params
    const category = await Category.find({ id })
    if (category) {
    	res.status(200).json({data: category})
    } else {
    	res.status(400)
    	throw new Error("Something went wrong")
    }
})
// UPDATE A CATEGORY
export const updateCategory = asyncHandler(async(req, res) => {
	
	if (req.user.isAdmin) {
		const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    	res.status(200).json({data: updatedCategory})
	} else {
		res.status(500)
		throw new Error("You are not authorized to perform this operation")
	}
})
// DELETE A CATEGORY
export const deleteCategory = asyncHandler(async(req, res) => {
	
	if (req.user.isAdmin) {
		await Category.findByIdAndDelete(req.params.id)
    	res.status(200).json({message: "Category successfully deleted"})
	} else {
		res.status(500)
		throw new Error("You are not authorized to perform this operation")
	}
})