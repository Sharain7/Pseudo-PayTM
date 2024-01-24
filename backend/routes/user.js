const  express = require("express");
const {User} = require('../db')
const zod  = require("zod")
const jwt = require("jsonwebtoken")
const {JWT_SECRET_KEY} = require('../config');
//creating a user router
const userRouter = express.Router();
//adding the signup auth 
const signUpObject = zod.object({
    username: zod.string().email() , 
    firstName: zod.string() , 
    lastName: zod.string() , 
    password: zod.string()
})
userRouter.post("/signup" , async(req,res)=> {
    const {success} = signUpObject.safeParse(req.body) ;
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const user  = await User.create({
        username : req.body.username ,
        firstName: req.body.firstName ,
        lastName: req.body.lastName  ,
        password: req.body.password
    })
    const userId = user._id ;
    const token = jwt.sign ({
        userId , 

    },JWT_SECRET_KEY)
    res.json({
        message: "User created successfully" , 
        token: token
    })
})

//2. Route to Sign In 
const signInPostBody = zod.object({
    username: zod.string().email() , 
    password: zod.string()
})
userRouter.post("/signin" , async(req,res)=>{
    const {success} = signInPostBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const user = await User.findOne({
        username: req.body.username , 
        password: req.body.password
    })
    const userId = user._id ; 
    if(user){
        const token = jwt.sign ({
            userId , 
    
        },JWT_SECRET_KEY)
        res.json({
            token: token
        })
        return;


    }
    res.status(411).json({
        message: "Error while logging in"
    })

})
module.exports = userRouter
