const Order = require("../models/Order");

exports.getAllOrders = async function (req, res, next) {
    try {
        const orders = await Order.find({userId: req.params.userId})
        res.status(200).send({orders})
    } catch (ex) {
        next(ex)
    }
}

// exports.getPostDetail = async function (req, res, next) {
//
//     const {postId} = req.params
//
//     try {
//         const post = await Post.findOne({_id: postId})
//         res.status(200).send({post: post})
//     } catch (ex) {
//         next(ex)
//     }
// }


exports.createOrder = async function (req, res, next) {
    const {
        title,
        price,
        stock,
        userId
    } = req.body


    try {

        let newPost = new Order({
            userId: userId,
            title,
            price,
            stock
        })

        newPost = await newPost.save()
        if (newPost) {
            res.status(201).send(newPost)
        }

    } catch (ex) {
        next(ex)
    }
}


//
// exports.buyProducts = async function (req, res, next) {
//     const { productIds } = req.body
//
//
//     try {
//
//
//
//     } catch (ex) {
//         next(ex)
//     }
// }
//
