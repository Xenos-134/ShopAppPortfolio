const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wishList:{
        type: Array
    },
    chatRooms:{
        type: Array,
        default: []
    },
    socket: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("User", UserSchema)
