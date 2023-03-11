import SubCategory from "../models/subCategory.js"
import asyncHandler from "express-async-handler"

// CREATE A SUBCATEGORY
export const createSubCategory = asyncHandler(async(req, res) => {
	const newSubCategory = new SubCategory({
	    title: req.body.title,
	    name: req.body.name,
	    image: req.body.image
    })
    if (req.user.isAdmin) {
    	const savedSubCategory = await newSubCategory.save()
        res.status(201).json({data: savedSubCategory})
    } else {
    	res.status(500)
    	throw new Error("You are not authorized to perform this operation")
    } 
})
// GET ALL SUBCATEGORIES
export const getAllSubCategories = asyncHandler(async(req, res) => {
	try {
        const subCategories = await SubCategory.find()
        res.status(200).json({data: subCategories})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// UPDATE A CATEGORY
export const updateSubCategory = asyncHandler(async(req, res) => {
	
	if (req.user.isAdmin) {
		const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    	res.status(200).json({data: updatedSubCategory})
	} else {
		res.status(500)
		throw new Error("You are not authorized to perform this operation")
	}
})
// DELETE A SubCATEGORY
export const deleteSubCategory = asyncHandler(async(req, res) => {
	
	if (req.user.isAdmin) {
		await SubCategory.findByIdAndDelete(req.params.id)
    	res.status(200).json({message: "SubCategory successfully deleted"})
	} else {
		res.status(500)
		throw new Error("You are not authorized to perform this operation")
	}
})