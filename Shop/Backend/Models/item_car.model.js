const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({
    description:{
        type: String,
    },
    version: {
        type: Number
    },
    brand:{
        type: String,
    },
    model:{
        type: String
    },
    photo:{
        type: String
    },
    price: {
        type: Number,
    },
    modelClass: {
        type: String,
        default: "Car"
    }
})


module.exports = mongoose.model("Car", CarSchema)