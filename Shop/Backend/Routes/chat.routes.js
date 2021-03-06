const router = require("express").Router()
const auth = require("../Middleware/auth.middleware")
const User = require("../Models/user.model")
const Chat = require("../Models/chat_room.model")

//Get all chat room and participants
router.get("/",auth,  async (req, res)=>{
    const user = await User.findById(req.user.userID)
    const chatRooms = user.chatRooms
    const userCRooms = await getUserCHatRooms(req.user.userID, chatRooms)
    return res.json({userCRooms})
})


async function getUserCHatRooms(userId, chatIdList){
    var chatRooms = []
    await Promise.all(chatIdList.map(async id => {
        const chat = await Chat.findById(id)
        const partner = await User.findById(chat.participant)
        const nchat = {
            id: chat._id,
            senderId: userId,
            chatPartnerName: partner.username,
            messages: messages1,
            n_unread: 10,
        }
        chatRooms.push(nchat)
    }))
    console.log("My Chat room ", chatRooms) 
    return chatRooms
}


//Looks for chat room with that participants. If does not exist 
//creates new ONE
router.get("/chatWithOwner/:id", auth, async (req, res)=>{
    console.log("OWNER ID ", req.params)
    const user = await User.findById(req.user.userID)
    const users = await User.find()
    
    const chat = await Chat.findOne({owner: user._id, participant: users[1]._id})
    if(chat){ //CHat room exists
        console.log("That chat exist", chat)
        return res.json(chat.id)
    }

    //Chat room doesnt exist and we will create new one
    const nchat1 = new Chat({
        owner: user._id,
        participant: users[1]._id
    })

    const nchat2 = new Chat({
        owner: users[1]._id,
        participant: user._id
    })

    user.chatRooms.push(nchat1._id)
    users[1].chatRooms.push(nchat2._id)
    user.save()
    users[1].save()

    await nchat1.save()
    await nchat2.save()
    return res.json(nchat1.id)
})


router.get("/getChatRoom/:chatID", auth, async (req,res)=>{
    const {chatID} = req.params
    const chat = await Chat.findById(chatID)
    if(!chat) return res.status(500).json("Some error")
    console.log("Chat Room ", chat)
    return res.json(chat)
})


module.exports = router

const messages1 = [
    {text: "hello", senderName: "John", senderId: "12", id: "1"},
    {text: "hi", senderName: "John", senderId: "1234", id: "2"},
    {text: "how is ur day", senderName: "John", senderId: "12", id: "3"},
    {text: "good. And ur?", senderName: "John", senderId: "1234", id: "4"},
    {text: "Test", senderName: "John", senderId: "12", id: "5"},
]