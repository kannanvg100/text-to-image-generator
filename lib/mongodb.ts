const mongoose = require('mongoose')

export default function init() {
	mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(`Mongodb connected with server`)
		})
		.catch(() => {
			console.error('Error connecting to MongoDB')
		})
}
