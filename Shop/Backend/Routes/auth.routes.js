//Routes For Authentification
const {Router} = require("express")
const  jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {config} = require("config")
const User = require("../Models/user.model")
const crypto = require("crypto")
const auth = require("../Middleware/auth.middleware")

const router = Router()

router.post("/signUp", async (req, res)=> {
    const {username, password} = req.body
    const SALT_ROUNDS = 10
    if(!username || !password){
        console.log("Doesnt exist")
        return res.status(500).json("FAIL")
    }

    const exist = await User.findOne({username})
    if(exist){
        console.log("username Taken")
        return res.status(500).json("FAIL")
    } //username already used

    try{
        bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                console.log("My Hash ", hash)
                const user = new User({username, password: hash})
                await user.save()
                return res.status(200).json("New User Were Created")
            });
        });
    }catch(e){
        console.log(e)
        return res.status(500).json("FAIL")
    }   
})

//**********************************************************************
//* Login - generates temporary token for session
//**********************************************************************
router.post("/logIn", async (req, res)=>{
    const {username, password} = req.body
    if(!username || !password) return res.status(500).json("No username or password provided")


    const exist = await User.findOne({username}) 
    if(!exist) return res.status(500).json("No username or password provided")
    
    try{
        bcrypt.compare(password, exist.password, async function(err, result){
            if(!result) return res.status(500).json("Error")
            const userToken = await jwt.sign({userID: exist._id}, "SuperScretToken", {expiresIn: "1h"})
            return res.status(200).json({userToken, userId: exist.id})
        })
    }catch(e){
        return res.status(500).json("Some error in server side")
    }
})

router.get("/", auth, (req, res)=> {  //Ping route for this router
    console.log("test >", req.body)
    return res.json("default")
})

module.exports = router