import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const { Schema } = mongoose

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	isAdmin: { type: Boolean, default: false },
	image: { type: String },
	phone: { type: String, default: "+254..." },
	bio: { type: String, default: "Hey I am a user", maxlength: [250, "Bio must not be greater than 250 characters"] }
	// password: { type: String, reduired: true }
}, { timestamps: true })

//encrypt password before saving
UserSchema.pre("save", async function(next) {
	if (!this.isModified("password")) {
		return next()
	} else {
	//hash password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(this.password, salt)	
		this.password = hash
		next()
	}
})

export default mongoose.model('User', UserSchema);
