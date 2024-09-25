
const Router = require("express")
const adminrouter = Router()
const { adminModel } = require("../db")
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const zod = require("zod");


adminrouter.post("/signup", async(req,res)=>{
    //validating input 
    const validInput = zod.object({
        firstname : zod.string().min(2).max(100),
        lastname : zod.string().min(2).max(100),
        email : zod.string().email().max(100),
        password : zod.string()
        .min(6, "Password must be at least 6 characters long")
        .max(100)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[\W_]/, "Password must contain at least one special character")
    })

    const validateInputData = validInput.safeParse(req.body)

    if(!validateInputData.success){
        res.status(402).json({
            msg : "invalid input format",
            error : validateInputData.error.errors
        })
        return;
    }

    // once validated
    const { firstname, lastname, email, password } = req.body

    const foundAdmin =await adminModel.findOne({email});

    if(foundAdmin){
        res.status(403).json({
            msg : "Admin already registered!"
        })
        return;
    }

    const hashedpassword = await bcrypt.hash(password,5);

    await adminModel.create({
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : hashedpassword,
    })

    res.json({
        msg : "admin signedup successfully!"
    })

})

adminrouter.post("/signin", async(req,res)=>{
    const { email, password } = req.body;

    const foundAdmin = await adminModel.findOne({email})

    if(!foundAdmin){
        res.status(403).json({
            msg : "admin not found, please register first!"
        })
        return;
    }

    const comparePassword = await bcrypt.compare(password,foundAdmin.password)

    if(!comparePassword){
        res.status(403).json({
            msg : "wrong password"
        })
        return;
    }

    const token = jwt.sign({
        id : foundAdmin._id
    },JWT_SECRET_ADMIN)

    res.json({
        msg : "admin signed in successfully!",
        token : token
    })
})

adminrouter.post("/createcourse", (req,res)=>{
    res.send("create a new course")
})

adminrouter.post("/deletecourse", (req,res)=>{
    res.send("delete a course")
})

adminrouter.post("/addcoursecontent", (req,res)=>{
    res.send("add more content to existing courses")
})

module.exports = {
    adminrouter : adminrouter
}