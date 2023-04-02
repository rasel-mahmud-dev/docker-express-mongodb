const Product = require("../models/Product");

const connectAmqp = require("../rabbiMq/connectAmqp")


let channel, newCart;

(async function(){
	channel = await connectAmqp()
	// await channel.assertQueue("create_order")
	await channel.assertQueue("create_order_done")
	await channel.assertQueue("added_cart_done")
}())



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
	const {productId, quantity} = req.body
	
	try {
		const product = await Product.findOne({_id: productId, stock: {$gt: 0}})
		
		if (!product) {
			return res.status(500).json({message: "Sorry currently this product not available in out stock"})
		}
		
		// call order services for create order
		channel.sendToQueue("create_order", Buffer.from(JSON.stringify({
			message: "hi from product services",
			productId: product._id,
			price: product.price,
			title: product.title,
			quantity: quantity,
			customerId: req?.user?._id
		})))
		
		// delete create_order_done message from queue
		channel.consume("create_order_done", function (data) {
			newOrder = JSON.parse(data.content);
			console.log("order create done, order id:", newOrder.id)
			channel.ack(data);
		});
		
		res.status(201).json({order: newOrder, message: "Order created."})
	
	} catch (ex) {
		res.status(500).json({message: ex.message})
	}
}



exports.addToCart = async function (req, res, next) {
	const {productId, quantity} = req.body
	
	try {
		const product = await Product.findOne({_id: productId, stock: {$gt: 0}})
		
		if (!product) {
			return res.status(500).json({message: "Sorry currently this product not available in out stock"})
		}
		
		// call order services for create order
		channel.sendToQueue("add_to_cart", Buffer.from(JSON.stringify({
			message: "hi from product services",
			productId: product._id,
			price: product.price,
			title: product.title,
			quantity: quantity,
			customerId: req?.user?._id
		})))
		
		// delete create_order_done message from queue
		channel.consume("added_cart_done", function (data) {
			newCart = JSON.parse(data.content);
			console.log("cart added done, cart id:", newCart.id)
			channel.ack(data);
		});
		
		res.status(201).json({card: newCart, message: "Cart created."})
	
	} catch (ex) {
		res.status(500).json({message: ex.message})
	}
}


