const mongoose = require("mongoose")

const Order = mongoose.model("User", {
    customerId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    title: String,
    price: String,
    quantity: String,
})


module.exports = Order