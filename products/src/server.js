
const app = require("./app/app")

const PORT  = process.env.PORT || 2010

const amqp = require("amqplib")

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



app.listen(PORT, ()=> {
    // connect()
    console.log(`server is running on port ${PORT}`)
} )

// module.exports = channel