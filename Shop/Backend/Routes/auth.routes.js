//Routes For Authentification
const {Router} = require("express")
const {jsonwebtoken} = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {config} = require("config")


const router = Router()

router.post("/signUp", async (req, res)=> {
    const {username, password} = req.body
    console.log(password)
    const SALT_ROUNDS = 10
    try{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                console.log("My Hash ", hash)
            });
        });
    }catch(e){
        console.log(e)
    }
    return res.json("Tryed To Connect")
})

router.post("/", (req, res)=> {
    console.log("test >", req.body)
    return res.json("default")
})

module.exports = router