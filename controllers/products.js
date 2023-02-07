import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"	

// NEW PRODUCT
export const createProduct = asyncHandler(async(req, res) => {
const newProduct = new Product({
    title: req.body.title,
    desc: req.body.desc,
    brand: req.body.brand,
    quantity: req.body.quantity,
    category: req.body.category,
    subcategory: req.body.subcategory,
    price: req.body.price,
    userId: req.user._id,
    photo: req.body.photo
    })
	try {
		const savedProduct = await newProduct.save()
        res.status(201).json({data: savedProduct})
	} catch (error) {
        res.status(500).json({msg: error})
        console.log(error)
    }
})
// GET PRODUCT
export const getProduct = asyncHandler(async(req, res) => {
	// const { id } = req.params.id
	
	try { 
		const product = await Product.findById(req.params.id)
		res.status(200).json({data: product})
	} catch (error) {
		res.status(400).json({message: error})
	}
})
// GET ALL PRODUCTS
export const getAllProducts = asyncHandler(async(req, res) => {
	const newQuery = req.query.new
     const queryCat = req.query.category 
     const subcat = req.query.subcategory
	try {
        let products;
        if (newQuery) {
            products = await Product.find().sort({ createdAt: -1} ).limit(8)
        } else if (queryCat) {
            products = await Product.find({ category: { $in:[queryCat], }}).sort({ createdAt: -1 }).limit(8)
        } else if (subcat) {
            products = await Product.find({ subcategory: { $in:[subcat], }}).sort({ createdAt: -1 }).limit(8)
        }else {
            products = await Product.find()
        }
        res.status(200).json({data: products})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// UPDATE PRODUCT
export const updateProduct = asyncHandler(async(req, res) => {
	try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json({data: updatedProduct})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// DELETE PRODUCT
export const deleteProduct = asyncHandler(async(req, res) => {
	try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "Product has been deleted"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})