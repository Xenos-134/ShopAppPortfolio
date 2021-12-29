const router = require("express").Router()
const Car = require("../Models/item_car.model")
const User = require("../Models/user.model")
const auth = require("../Middleware/auth.middleware")
const multer = require("multer")


//Multer Section
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "./media")
    },
    filename(req, file, callback){
        console.log(file)
        callback(null, req.user.userID+"_"+file.originalname+"_"+Date.now()+".jpg")
    }
})
const upload = multer({storage})


router.get("/", (req, res)=>{
    console.log("Item Route Test")
    return res.json("TEST")
})


//Route to create new Car
router.post("/newCar", auth, upload.any(), async (req, res)=>{
    console.log(">>>", req.files[0].filename)
    const car_form =  await JSON.parse(req.body.item)
    
    try{
        var new_car = new Car()
        new_car.brand = car_form.Brand
        new_car.model = car_form.Model
        new_car.description = car_form.Description
        new_car.version = car_form.Version
        new_car.price = car_form.Price
        new_car.image = req.files[0].filename
        new_car.ownerId = req.user.userID

        console.log("We are trying to create new Car ", new_car)
        await new_car.save()
        return res.status(200).json("Success")
    }catch(e){
        console.log(e)
        return res.status(500).json("Error message")
    }
})

//Adds item to wish List
router.post("/addToWishList", auth,  async (req, res)=>{
    const item = await Car.findById(req.body.itemID) 
    const user = await User.findById(req.user.userID)
    const list = await isInList(user, item.id)
    user.wishList = list
    await user.save()
    console.log("WL ", user.wishList)
    
    
})


async function isInList(user, itemID){
    const list = await user.wishList.filter(id => id !== itemID)
    if(list.length !== user.wishList.length){
        console.log("Is in list")
        return list
    }
    await list.push(itemID)
    return list
}

router.get("/wlItems", auth, async (req, res)=>{
    const user = await User.findById(req.user.userID)
    const list = await getUserWL(user.wishList)
    console.log(list)
    return res.json(list)
})

async function getUserWL(wishList){
    var array = []
    await Promise.all(
        wishList.map(async elm=>{
            const item = await Car.findById(elm)
            array.push(item)
            } 
        )
    )
    return array
}

//Route to get all items from DB
router.post("/all", async (req, res)=>{
    const cars = await Car.find()
    //console.log("Our Cars ", cars)
    return  res.json({items: [...cars]})
})

router.get("/getItem/:id", auth, async (req, res)=>{
    try{
        const item = await Car.findById(req.params.id)
        console.log("Our item ", item)
        return res.json(item)
    }catch(e){
        return res.status(500).json("That item doeesnt exist")
    }
    
})

module.exports = router