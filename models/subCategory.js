import mongoose from "mongoose"

const SubCategorySchema = new mongoose.Schema({
	image: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	catId: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Category',
	    required: false
  	},
	desc: {
		type: String,
		unique: true
	}
}, { timestamps: true }, { autoIndex: false })


export default mongoose.model('SubCategory', SubCategorySchema);