const mongoose = require("mongoose")


const Product = mongoose.model("Product", new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	categoryId: {
		index: true,
		type: String

	},
	brandId: {
		type: String,
		index: true
	},
	thumb: {
		type: String,
	},
	images: Array,
	price: {
		type: Number,
	},
	stock: {
		type: Number,
	},
	userId: {
		type: String,
		required: true
	}
	
}, {timestamps: true}))


module.exports = Product