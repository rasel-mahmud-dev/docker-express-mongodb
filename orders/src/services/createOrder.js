const Order = require("../models/Order");

function createOrder (productData) {
    return new Promise(async (resolve, reject)=>{
        const {
            productId,
            price,
            title,
            quantity = 1,
            customerId
        } = productData


        try {

            let newPost = new Order({
                customerId,
                title,
                price,
                quantity,
                productId,
            })

            newPost = await newPost.save()
            if (newPost) {
                resolve(newPost)
            }

        } catch (ex) {
            reject({message: "Order creation fail"})
        }
    })
}

module.exports = createOrder

