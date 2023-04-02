const Order = require("../models/Order")

function createOrder(productData) {
	return new Promise(async (resolve, reject) => {
		const {
			productId,
			price,
			title,
			quantity = 1,
			customerId
		} = productData
		
		
		try {
			
			let newOrder = new Order({
				title,
				price: Number(price),
				quantity: Number(quantity),
				productId,
				customerId: customerId
			})

			newOrder = await newOrder.save();

			if (newOrder) {
				resolve(newOrder)
			} else {
				reject({message: "Order creation fail"})
			}
			
		} catch (ex) {
			reject({message: "Order creation fail"})
		}
	})
}

module.exports = createOrder

