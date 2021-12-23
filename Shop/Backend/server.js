//Main part of ther backend
const express = require("express")
const {Server} = require("socket.io")
const app = express()
const server = require("http").createServer(app)
const config = require("config")
const mongoose =require("mongoose")
const io = new Server(server)
const multer = require("multer")

//APP use section
app.use(express.json({extended: "true"}))
app.use(express.static("media"))


const PORT = config.get("port")


//Multer Section
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "./media")
        console.log("WE ARE HERE")
    },
    filename(req, file, callback){
        callback(null, "img_"+Date.now())
    }
})
const upload = multer({storage})


io.on('connection', (socket) => {  
    console.log('a user connected');  
    socket.on('disconnect', () => {    
        console.log('user disconnected');  
    });
});

app.get("/", (req, res)=>  {
    console.log("TEST")
})

app.post("/upload", upload.single("test"), (req, res)=>{
    console.log("test")
    console.log(req.file)
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

start()


