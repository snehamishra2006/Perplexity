import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"
export async function register(req,res){
    const {username,email,password} = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{email},{username}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists",
            sucess: false,
            err: "User already exists"     
        })
    }
    
    // create user
    const user = await userModel.create({username,email,password})

    await sendEmail({
        to:  email,
        subject:"Welcome to perplexity",
        html:`<p> Hi ${username},</p>
        <p> Thank you for registering at Perplexity. we're excited to have you on board!</p>
         <p> The Perplexity Team </p> `

    })

    res.status(201).json({
        message:"User registered successfullly",
        success: true,
        users:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
     
}