const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            res.status(500).json("No token were provided")
        }
        const decoded = await jwt.verify(token, config.get("jwtToken"))
        req.user = decoded
        
        next()
    }catch(e){
        console.log("Token Doesnt Match", e)
    }
}
