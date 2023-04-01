const mongoose = require("mongoose")


const Product = mongoose.model("Product", new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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