
const app = require("./app/app")

const PORT  = process.env.PORT || 2010

const amqp = require("amqplib")
const connectAmqp = require("./rabbiMq/connectAmqp");
const getProductDetail = require("./services/getProductDetail");

let channel;

// async function connect(){
//     try{
//         const connection = await amqp.connect("amqp://localhost:5672")
//         channel = await connection.createChannel()
//         await channel.assertQueue("PRODUCT")
//         console.log("rabbitmq server connected.")
//     } catch (ex){
//         console.log(ex.message)
//     }
// }


app.listen(PORT, async ()=> {
    
   let channel = await connectAmqp()
    await channel.assertQueue("product_info")
    // await channel.assertQueue("product_info_received", {durable: true})
    
    channel.consume("product_info", async (msg)=>{
        let productId = msg.content.toString()
        let data = await getProductDetail(productId)
        if(data){
           await channel.sendToQueue("product_info_received", Buffer.from(JSON.stringify(data)))
        } else{
            await channel.sendToQueue("product_info_received", Buffer.from(""))
        }
    })
    
    console.log(`server is running on port ${PORT}`)
} )

// module.exports = channel