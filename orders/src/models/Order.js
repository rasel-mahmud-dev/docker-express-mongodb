const mongoose = require("mongoose")


const Order = mongoose.model("Order", new mongoose.Schema({

    productId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    title: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    customerId: {
        type: String,
        required: true
    }

}, {timestamps: true}))


module.exports = Order