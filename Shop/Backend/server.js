const express = require("express")


const app = express()
const server = require("http").createServer(app)
const config = require("config")
const mongoose =require("mongoose")

//APP use section
app.use(express.json({extended: "true"}))
const PORT = config.get("port")

app.get("/", (req, res)=>{
    console.log("Someone is tryning to acess backend")
    return res.json("Backend for the app")
})



async function start(){
    try{
        await mongoose.connect(config.get("mongoDB"))

        server.listen(PORT, ()=>{
            console.log("Server listening on port ", PORT)
        })
    }catch(e){
        console.log("Some error ocurred while trying launch server\n", e)
        process.exit(1)
    }
}


//Routes Section
app.use("/auth", require("./Routes/auth.routes"))
app.use("/item", require("./Routes/item.routes"))

start()


