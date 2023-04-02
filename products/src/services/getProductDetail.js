const Product = require("../models/Product");

const getProductDetail = (productId) => {
	return new Promise(async (resolve) => {
		try {
			const product = await Product.findOne({_id: productId})
			resolve(product)
		} catch (ex) {
			resolve(null)
		}
	})
}

module.exports = getProductDetail