const app = require("./app/app")

const PORT  = process.env.PORT || 2012

const amqp = require("amqplib")
const addToCart = require("./services/addToCart");
const prismaClient = require("../prisma/prismaClient");

app.listen(PORT, async ()=> {
    
    const connection = await amqp.connect("amqp://localhost:5672")
    let channel = await connection.createChannel()
    await channel.assertQueue("add_to_cart", {durable: false})
  
    
    // create order subscriber
    await channel.consume("add_to_cart", async (msg) => {
        let data = JSON.parse(msg.content.toString())
    
        addToCart(data).then((data)=>{
            console.log("product added in cart done")
            // channel.sendToQueue("added_cart_done", Buffer.from(JSON.stringify(data)))
        })
    }, {noAck: true})

    
    
/*    await channel.consume("delete_order", ({content}) => {
        // console.log(JSON.parse(content.toString()))
        console.log("delete order")
    })*/

    
    console.log(`server is running on port ${PORT}`)
} )



