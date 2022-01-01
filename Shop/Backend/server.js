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


//Import model section
const User = require("./Models/user.model")
const ChatRoom = require("./Models/chat_room.model")

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
        //When user connects to socket, he send his token and we save in 
        //user.model socket his actual socket 
        var userID
        if(socket.handshake.query && socket.handshake.query.userToken){
            userID = await verifyUserToken(socket.handshake.query.userToken, config.get("jwtToken"))
            saveUserSocket(userID, socket.id)
            // const user = await User.findOne({username: "Xenos"})
            // io.to(user.socket).emit("test", {message: "test"})
        }
    }catch(e){
        console.log(e)
    }
    socket.on('disconnect', () => {    
        console.log('user disconnected');  
    });
    socket.on("client", async (message)=>{ // Need to pass here true sender Username
        const x2 = (await User.find())[1]
        sendMessageToUser(userID, x2.id,  message.message, x2.username)
        
    })
});


async function sendMessageToUser(owner, partner, text, senderUsername){
    const chatRoomO = await ChatRoom.findOne({owner, partner})
    const chatRoomP = await ChatRoom.findOne({owner: partner, partner: owner})
    
    const message = await createNewMessage(owner, partner, text, senderUsername)
    chatRoomO.messages.push(message)
    chatRoomP.messages.push(message)
        chatRoomO.save()
        chatRoomP.save()
}

function createNewMessage(from, to, text, senderUsername){
    const message = {
        id: Date.now(), //Just for now
        senderId : from,
        to: to,
        text: text,
        time: Date.now(),
        senderName: senderUsername

    }
    console.log("MESSAGE ", message)
    return message
}


//Same shit as auth.middleware but returns useID
async function verifyUserToken(token){
    const decoded = jwt.verify(token, config.get("jwtToken"))
    //console.log("Decoded ", decoded)
    return decoded.userID
}


async function saveUserSocket(userID, socketID){
    const user = await User.findById(userID)
    user.socket = socketID
    await user.save()
    // console.log("User actual socket ", socketID)
    // console.log("User ", user)
    return true
}

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

