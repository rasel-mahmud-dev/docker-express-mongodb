const app = require("./app/app")

const PORT  = process.env.PORT || 2011

const amqp = require("amqplib")
const createOrder = require("./services/createOrder");

// const connectAmqp = require("./rabbiMq/connectAmqp");



app.listen(PORT, async ()=> {

    // let orderChannel =  await connectAmqp()

    const connection = await amqp.connect("amqp://localhost:5672")
    let channel = await connection.createChannel()
    await channel.assertQueue("create_order", {durable: false})
    await channel.assertQueue("delete_order", {durable: false})

    await channel.consume("create_order", async (msg) => {
        let data = JSON.parse(msg.content.toString())
        // console.log(data)
        await createOrder(data).then((data)=>{
            console.log("create order done")
            channel.sendToQueue("create_order_done", Buffer.from(JSON.stringify(data)))
        }).catch(ex=>{
            console.log("sdkfjsdkf")
        }).finally(()=>{
            channel.ack(msg)
        })
    })

    await channel.consume("delete_order", ({content}) => {
        // console.log(JSON.parse(content.toString()))
        console.log("delete order")
    })

    console.log(`server is running on port ${PORT}`)
} )



