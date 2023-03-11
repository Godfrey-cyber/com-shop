import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
	title: { 
		type: String, required: true
	 },
	desc: { 
		type: String, required: true 
	},
	photo: { 
		type: String,
		default: "https://sky.garden/assets/loading-spinners.svg"
	 },
	brand: { 
		type: String, default: "Generic"
	 },
	 review: { 
		type: mongoose.Schema.ObjectId, 
		ref: "Review"
	 },
	inStock: { 
		type: Number, required: [true, "A product must have a quantity"]
	 },
	price: { 
		type: Number, required: true
	 },
	discount: { 
		type: Number, default: 0
	 },
	userId: { 
		type: mongoose.Schema.ObjectId, ref: "User", 
		required: [true, "A product must belong to a user"] 
	},
	catId: { 
		type: mongoose.Schema.ObjectId, 
		ref: "Category", required: [true, "A product must belong to a Category"] 
	}
}, )
export default mongoose.model('Product', ProductSchema);

// computing: "63e7462a8a50ebed10e63e45"
// electronics: "63e746fdbe4e3120b92055f7"
// furnitures: "63e74741be4e3120b92055fa"
// home appliances: "63e746abbe4e3120b92055f3"
// smartphones: "63e745518a50ebed10e63e3e" 