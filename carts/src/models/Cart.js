const mongoose = require("mongoose")

const Cart = mongoose.model("Cart", new mongoose.Schema({
	productId: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
	},
	customerId: {
		type: String,
		required: true
	}
	
}, {timestamps: true}))




module.exports = Cart