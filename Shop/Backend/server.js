//Main part of ther backend
const express = require("express")
const {Server} = require("socket.io")
const app = express()
const server = require("http").createServer(app)
const config = require("config")
const mongoose =require("mongoose")
const io = new Server(server)
const multer = require("multer")
const auth = require("./Middleware/auth.middleware")
const jwt = require("jsonwebtoken")

//APP use section
app.use(express.json({extended: "true"}))
app.use(express.static("media"))


const PORT = config.get("port")


//Multer Section
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "./media")
    },
    filename(req, file, callback){
        callback(null, "img_"+Date.now())
    }
})

const upload = multer({storage})


io.on('connection', async (socket) => {  
    try{
        if(socket.handshake.query && socket.handshake.query.userToken){
            const decoded = jwt.verify(socket.handshake.query.userToken, config.get("jwtToken"))
            console.log("decoded ", decoded)
        }
    }catch(e){
        console.log(e)
    }
    socket.on('disconnect', () => {    
        console.log('user disconnected');  
    });
});

app.get("/", (req, res)=>  {
    console.log("TEST")
})

app.post("/setSocket", auth,  async (req, res)=>{
    console.log("SOCKET TEST ",req.body)
})


app.post("/upload", upload.any(), async (req, res)=>{
    console.log("test")
    const item = await JSON.parse(req.body.item)
    console.log(item)
    console.log(req.files)
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
app.use("/chat", require("./Routes/chat.routes"))

start()
module.exports = upload

