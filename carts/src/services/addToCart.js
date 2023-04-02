const prismaClient = require("../../prisma/prismaClient");

function addToCart(productData) {
	console.log(productData)
	// return new Promise(async (resolve, reject) => {
	// 	const {
	// 		productId,
	// 		price,
	// 		title,
	// 		quantity = 1,
	// 		customerId
	// 	} = productData
	//
	//
	// 	try {
	//
	// 		let newOrder = await prismaClient.order.create({
	// 			data: {
	// 				customerId,
	// 				title,
	// 				price: Number(price),
	// 				quantity: Number(quantity),
	// 				productId,
	// 			}
	// 		})
	//
	// 		if (newOrder) {
	// 			resolve(newOrder)
	// 		} else {
	// 			reject({message: "Order creation fail"})
	// 		}
	//
	// 	} catch (ex) {
	// 		reject({message: "Order creation fail"})
	// 	}
	// })
}

module.exports = addToCart

