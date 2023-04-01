const express = require("express")

const {config} = require("dotenv")
const os = require("os")
const mongodb = require("mongodb")

const app = express() 


const client = new mongodb.MongoClient(process.env.MONGODB_URI)


function mongoConnect(){
    return new Promise(async (resolve, reject)=>{
        try{
            await client.connect()
            console.log("database connected...");

            resolve(client.db("info"))
            

        } catch(ex){
            console.log(ex);
            throw ex
        }
    })
}


app.get("/", (req, res)=>{
    const SECRET = process.env.SECRET
    mongoConnect().then(()=>{
        console.log("database connected");
        res.send("Express application inside docker " + SECRET) 
    }).catch(ex=>{
        res.send(ex.message) 
    })
  
})

app.get("/logs", async (req, res)=>{
    try{
        let client = await mongoConnect() 
    
        let Col = await client.collection("info")
        let items = await Col.find({}).toArray() 
        res.send(items)


    } catch(ex){
        console.log(ex);
    }
})

app.post("/logs", async(req, res)=>{
    let logCollection = await (await mongoConnect()).collection("info")
    let result = await logCollection.insertOne({time: new Date(), message: "empty"})
    res.send(result)
})



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`server is running on port ${PORT}` ))