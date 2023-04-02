const prismaClient = require("../../prisma/prismaClient");
const connectAmqp = require("../rabbiMq/connectAmqp");


let channel;

(async function () {
	channel = await connectAmqp()
	channel.assertQueue("product_info_received")
}())


exports.getCartItems = async function (req, res, next) {
	try {
		const orders = await prismaClient.cartItem.findMany({
			where: {
				userId: req.params.userId
			}
		})
		res.status(200).send({orders})
	} catch (ex) {
		next(ex)
	}
}


exports.createCart = async function (req, res, next) {
	const {productId} = req.body
	
	let products = []
	
	
	try {
		
		// now we need product information
		await channel.sendToQueue("product_info", Buffer.from(productId))
		
		
		// delete create_order_done message from queue
		let data = await productDetailMessage(channel)
		// channel.ackAll(data)
		
		let product = JSON.parse(data.content.toString())
		console.log(product)
		res.status(201).json({cart: {
			message: "done"
		}})
		
		// if(!product) {
		// 	res.send(404).json({message: "Product add to cart fail"})
		// }
		
		
		// res.send(product)
		
		
		
		// let id = Number(req.params.cartId)
		// let order = await prismaClient.cartItem.deleteMany({
		//     where: {
		//         id: id,
		//         customerId: req.user._id
		//     }
		// })
		// res.status(201).send({success: "ok"})
	} catch (ex) {
		res.status(500).json({message: ex.message})
	}
}


function productDetailMessage(channel) {
	return new Promise(async (resolve, reject) => {
		try {
			channel.consume("product_info_received", async function (data) {
				if (!data) {
					console.error('Consumer cancelled by server!');
					reject(null)
				}
				
				resolve(data)
			});
		} catch (ex) {
			reject(null)
		}
		
	})
}


exports.deleteCartItem = async function (req, res, next) {
	try {
		let id = Number(req.params.cartId)
		let order = await prismaClient.cartItem.deleteMany({
			where: {
				id: id,
				customerId: req.user._id
			}
		})
		res.status(201).send({success: "ok"})
	} catch (ex) {
		console.log(ex)
		next(ex)
	}
}


