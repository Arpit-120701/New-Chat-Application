const asyncHandler = require('express-async-handler')
const User = require("../Models/userModel")
const colors = require('colors')
const generateToken = require('../Config/generateToken')


const registerUser= asyncHandler( async (req, res)=>{

    const { name , email , password , pic } =  req.body;

    if( !name || !email || !password ){
        res.status(400);
        throw new Error("Please fill all the details !!!")
    }

    const userExits = await User.findOne({ email });

    if(userExits){
        res.status(400);
        throw new Error("User Already exits !!")
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            pic:user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create the user ".red.bold)
    }
});


const authUser = asyncHandler ( async (req, res ) =>{
      const  { email , password } = req.body;
      const user = await User.findOne({ email });

      if(user && (await user.matchedPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token: generateToken(user._id),
        });
        console.log("Login successfully !")
      }
      else {
        console.log("yaha error hai lya ")
        res.status(401);
        throw new Error("Invalid Email or password !!")
      }
})

const allUsers = asyncHandler( async(req,res) =>{
         const keyword = req.query.search ? {
            $or: [
                   { name :{ $regex : req.query.search , $options:"i" }},
                   { email: { $regex: req.query.search , $options:"i" } }
                 ]
         }
         :
         {};
         const users = await User.find(keyword).find({_id: { $ne : req.user._id }});
         res.send(users)
    });


    


module.exports ={ registerUser , authUser , allUsers  }