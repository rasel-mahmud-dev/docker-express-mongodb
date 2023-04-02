const amqp = require("amqplib");


// for caching
let channel;

function connectAmqp(){
    return new Promise(async (resolve, reject)=>{
        try{
           if(!channel){
               const connection = await amqp.connect("amqp://localhost:5672")
               channel = await connection.createChannel()
               resolve(channel)
               
               // await channel.assertQueue("create_order_done")
               // await channel.consume("create_order_done", ({content})=>{
               //     let out = JSON.stringify(content.toString())
               //     console.log(out)
               // })

           } else {
               resolve(channel)
           }

        } catch (ex){
            throw  ex
        }
    })
}


module.exports = connectAmqp