import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
	image: {
		type: String,
		required: true,
	},
	title: {
		type: String	},
	desc: {
		type: String
	},
	descImage: {
		type: String
	},
	productId: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Product',
	    required: false
  	},
	name: {
		type: String,
		required: true,
	}
}, { timestamps: true }, { autoIndex: false })


export default mongoose.model('Category', CategorySchema);