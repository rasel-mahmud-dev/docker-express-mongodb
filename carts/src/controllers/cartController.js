
const Cart = require("../models/Cart");
const client = require("../grpc/client");




let channel, productDetail;



exports.countCartItems = async function (req, res, next) {
    try {
        const count = await Cart.countDocuments({
            customerId: req.user._id
        })
        res.status(200).send({count: count})
    } catch (ex) {
        next(ex)
    }
}

exports.getCartItems = async function (req, res, next) {
    try {
        const carts = await Cart.find({
            // customerId: req.user._id
        })
        res.status(200).send({carts})
    } catch (ex) {
        next(ex)
    }
}


exports.createCart = async function (req, res, next) {
    const {productId} = req.body

    try {


        let userId = "641d8088f8f8ad5a370429a2"
        console.log(client)


        
        // take product information for add to cart
        // channel.sendToQueue("product_info", Buffer.from(productId))
        //
        // // delete create_order_done message from queue
        // channel.consume("product_info_received", async function (data) {
        //     try {
        //         productDetail = JSON.parse(data.content.toString());
        //         channel.ack(data);
        //
        //         if (productDetail) {
        //             let newItem = new Cart({
        //                 productId: productDetail._id,
        //                 quantity: productDetail?.quantity || 1,
        //                 customerId: userId
        //             })
        //
        //             newItem = await newItem.save()
        //         }
        //
        //     } catch (ex) {
        //         console.log(ex)
        //     }
        // });

        res.status(201).json({order: productDetail, message: "Product added to cart successfully."})

    } catch (ex) {
        res.status(500).json({message: ex.message})
    }
}


exports.deleteCartItem = async function (req, res, next) {
    try {
        let id = req.params.cartId
        let order = await Cart.deleteOne({
            _id: id,
            customerId: req.user._id
        })
        res.status(201).send({success: "ok"})
    } catch (ex) {
        next(ex)
    }
}


