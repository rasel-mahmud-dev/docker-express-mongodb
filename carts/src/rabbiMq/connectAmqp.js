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
           } else {
               resolve(channel)
           }

        } catch (ex){
            throw  ex
        }
    })
}


module.exports = connectAmqp