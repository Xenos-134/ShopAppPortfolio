const mongoose = require("mongoose")

//For each chat between users, each user will have own chat room
const ChatRoomSchema = new mongoose.Schema({
    owner: {
        type:String
    },
    participant:{
        type: String
    },
    messages: {
        type: Array
    },
})

module.exports = mongoose.model("ChatRoom", ChatRoomSchema)