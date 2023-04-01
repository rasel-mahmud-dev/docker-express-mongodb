
const Product = require("../models/Product");

const connectAmqp = require("../rabbiMq/connectAmqp")

exports.getAllProduct = async function (req, res, next) {
    try {
        const products = await Product.find({})
        res.status(200).send({products: products})
    } catch (ex) {
        next(ex)
    }
}

exports.getProductDetail = async function (req, res, next) {
    const {slug} = req.params

    try {
        const post = await Product.findOne({slug: slug})
        res.status(200).send({product: post})
    } catch (ex) {
        next(ex)
    }
}

exports.createProduct = async function (req, res, next) {
    const {
        title,
        price,
        stock,
        userId
    } = req.body


    try {

        let newPost = new Product({
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


exports.buyProducts = async function (req, res, next) {
    const { productId, quantity } = req.body

    try {

        const product = await Product.findOne({_id: productId, stock: {$gt : 0}})
        if(!product){
            return res.status(500).json({message: "Sorry currently this product not available in out stock"})
        }

        // call order services for create order
        let channel = await connectAmqp()
        channel.sendToQueue("create_order", Buffer.from(JSON.stringify({
            message: "hi from product services",
            productId: product._id,
            price: product.price,
            title: product.title,
            quantity: quantity,
            customerId: req?.user?._id
        })))



    } catch (ex) {
        res.status(500).json({message: ex.message})
    }
}

