const router = require("express").Router()
const Car = require("../Models/item_car.model")
const auth = require("../Middleware/auth.middleware")
const multer = require("multer")

//Multer Section
const storage = multer.diskStorage({
    
    destination(req, file, callback){
        callback(null, "./media")
    },
    filename(req, file, callback){
        console.log(file)
        callback(null, req.user.userID+"_"+file.originalname+"_"+Date.now())
    }
})
const upload = multer({storage})




router.get("/", (req, res)=>{
    console.log("Item Route Test")
    return res.json("TEST")
})


//Route to create new Car
router.post("/newCar", auth, upload.any(), async (req, res)=>{
    console.log(">>>", req.user)
    const car_form =  await JSON.parse(req.body.item)
    
    try{
        var new_car = new Car()
        new_car.brand = car_form.Brand
        new_car.model = car_form.Model
        new_car.description = car_form.Description
        new_car.version = car_form.Version
        new_car.price = car_form.Price
        new_car.image = car_form.Image
        new_car.ownerId = req.user.userID

        console.log("We are trying to create new Car ", new_car)
        //await new_car.save()
        return res.status(200).json("Success")
    }catch(e){
        console.log(e)
        return res.status(500).json("Error message")
    }
})


//Route to get all items from DB
router.post("/all", async (req, res)=>{
    const cars = await Car.find()
    //console.log("Our Cars ", cars)
    return  res.json({items: [...cars]})
})

module.exports = router