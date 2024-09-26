
const Router = require("express")
const adminrouter = Router()
const { adminModel, courseModel } = require("../db")
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const zod = require("zod");
const { adminAuth } = require('../middlewares/admin')


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
        id : foundAdmin._id.toString()
    },JWT_SECRET_ADMIN)

    res.json({
        msg : "admin signed in successfully!",
        token : token
    })
})

adminrouter.post("/createcourse",adminAuth, async(req,res)=>{
    const creatorId = req.id;

    // as the admin is authenticated, he is authorized to create a course
    const{ title, description, price, imageUrl } = req.body;

    await courseModel.create({
        title,description,price,imageUrl,creatorId
    })

    res.json({
        msg : "course created successfully!!!"
    })
})

adminrouter.put("/updatecourse",adminAuth, async(req,res)=>{
    
    const creatorId = req.id;

    const { title, description, price, imageUrl, courseId } = req.body;

    await courseModel.updateOne({
    //filters to find the course to be updated, has its own id and the creator id, to make sure only the authorized created can update
        _id : courseId,
        creatorId : creatorId
    },{
        title,description,price,imageUrl
    })

    res.json({
        msg : "course updated successfully!",
        courseId : courseId
    })
    
})

adminrouter.get("/allCourses",adminAuth, async(req,res)=>{
    const creatorId = req.id;

    const courses = await courseModel.find({creatorId});

    res.json({
        courses
    })

})


adminrouter.post("/deletecourse", (req,res)=>{
})


module.exports = {
    adminrouter : adminrouter
}