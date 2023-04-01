
const app = require("./app/app")

const PORT  = process.env.PORT || 2003

const amqp = require("amqplib")



async function connect(){
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue("PRODUCT")
}



app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )

