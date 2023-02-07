import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
	title: { type: String, required: true },
	desc: { type: String, required: true },
	photo: { type: String },
	brand: { type: String, default: "Generic" },
	category: { type: String, required: true },
	// subcategory: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
	userId: { type: mongoose.Schema.ObjectId, ref: "User", required: [true, "A product must belong to a user"] }
}, { timestamps: true }, { autoIndex: false })
export default mongoose.model('Product', ProductSchema);