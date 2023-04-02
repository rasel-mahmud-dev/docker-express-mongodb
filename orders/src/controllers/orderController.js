
const Order = require("../models/Order")


exports.getAllOrders = async function (req, res, next) {
    try {
        const orders = await Order.find({
            userId: req.params.userId
        })
        res.status(200).send({orders})
    } catch (ex) {
        next(ex)
    }
}


exports.deleteOrder = async function (req, res, next) {
    try {
        let _id = req.params.orderId
        let order = await Order.deleteOne({
            _id,
            customerId: req.user._id
        })
        res.status(201).send({success: "ok"})
    } catch (ex) {
        console.log(ex)
        next(ex)
    }
}


