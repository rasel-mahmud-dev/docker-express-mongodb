const app = require("./app/app")


const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');



const PORT  = process.env.PORT || 2014


const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected")
}).catch(ex=>{
    console.log("database connection fail")
})




app.listen(PORT, async ()=> {
    console.log(`server is running on port ${PORT}`)
} )



