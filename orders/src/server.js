const app = require("./app/app")

const PORT  = process.env.PORT || 2013

const amqp = require("amqplib")
const createOrder = require("./services/createOrder");
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected")
}).catch(ex=>{
    console.log("database connection fail")
})


app.listen(PORT, async ()=> {
    
    const connection = await amqp.connect("amqp://localhost:5672")
    let channel = await connection.createChannel()
    await channel.assertQueue("create_order", {durable: false})
    await channel.assertQueue("delete_order", {durable: false})

    console.log("connect rabbitmq server")
    
    // create order subscriber
    await channel.consume("create_order", async (msg) => {
        let data = JSON.parse(msg.content.toString())
        
        createOrder(data).then((data)=>{
            console.log("create order done")
            channel.sendToQueue("create_order_done", Buffer.from(JSON.stringify(data)))
        })
    }, {noAck: true})

    
    
    await channel.consume("delete_order", ({content}) => {
        // console.log(JSON.parse(content.toString()))
        console.log("delete order")
    })

    console.log(`server is running on port ${PORT}`)
} )



