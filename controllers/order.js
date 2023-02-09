import asyncHandler from "express-async-handler"	
import Order from "../models/orderModel.js"

// CREATE Order
export const createOrder = asyncHandler(async(req, res) => {
	const newOrder = new Order(req.body)

	try {
		const savedOrder = await newOrder.save()
		res.status(201).json({ data: savedOrder })
	} catch (error) {
		res.status(500).json({ message: error })
	}
})
// UPDATE Order
export const updateOrder = asyncHandler(async(req, res) => {
	try {
        const updatedOrder = await Order.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true})
        res.status(200).json({data: updatedOrder})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// DELETE PRODUCT
export const deleteOrder = asyncHandler(async(req, res) => {
	try {
        await order.findByIdAndDelete(req.user._id)
        res.status(200).json({msg: "Order has been deleted"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// GET USER Orders
export const getUserOrder = asyncHandler(async(req, res) => {
	try {
		const Order = await Order.find(req.user._id)
        res.status(200).json({ data: order })
	} catch (error) {
		res.status(500).json({ message: error })
	}
})
// GET ALL Order
export const getAllOrders = asyncHandler(async(req, res) => {
	try {
		// if (true) {} else {}
		const orders = await Order.find()
        res.status(200).json({ data: orders })
	} catch (error) {
		res.status(500).json({ message: error })
	}
})

// INCOME STATS
export const getIncomeStats = asyncHandler(async(req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() -1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1))
    try {
        const income = await User.aggregate([
        { $match: { createdAt: { $gte: prevMonth }}},
        {
            $project: {
                month: { $month: "$createdAt"},
                sales: "$amount",
            },
        },
        {
            $group: {
                _id:"$month" ,
                total: { $sum: "$sales" }
            },
        }
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(400).json(error)
    }
})
