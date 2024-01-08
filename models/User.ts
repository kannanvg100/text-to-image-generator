const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [3, 'Name should have atleast 3 Chars'],
		default: 'User',
		trim: true,
	},
	method: {
		type: String,
		enum: ['google', 'github'],
		required: true,
		default: 'local',
		select: false,
	},
	email: {
		type: String,
		required: [true, 'Please Enter Your Email address'],
		unique: true,
		lowercase: true,
		trim: true,
	},
	picture: {
		type: String,
		default: 'https://levelup.s3.ap-south-1.amazonaws.com/default_avatar.png',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.models.User || mongoose.model('User', userSchema)
