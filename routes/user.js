
const Router = require("express")
const userrouter = Router()
const { userModel } = require("../db");
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// all the route handlers for request on /user endpoint
    userrouter.post("/signup", async(req,res)=>{
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;

        const foundUser = await userModel.findOne({email : email})
        
        if(foundUser){
            res.status(403).json({
                msg : "email already exists!"
            })
            return
        }

        const hashedpassword = await bcrypt.hash(password,5)

        await userModel.create({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : hashedpassword
        })

        res.json({
            msg : "you signed up successfully!"
        })
    })

    userrouter.post("/signin", async(req,res)=>{
        const email = req.body.email;
        const password = req.body.password;

        const finduser = await userModel.findOne({
            email : email
        })

        if(!finduser){
            res.status(403).json({
                msg : "user not found, please signup first!"
            })
            return;
        }

        const comparePassword = await bcrypt.compare(password,finduser.password)

        if(!comparePassword){
            res.status(403).json({
                msg : "incorrect password!"
            })
            return;
        }

        const token = jwt.sign({
            id : finduser._id.toString()
        },JWT_SECRET);

        res.json({
            token : token
        })

    })

    userrouter.get("/purchases", (req,res)=>{             //endpoint to see all the purchased course
        const recievedToken = req.headers.token;

        const verifiedResponse = jwt.verify(recievedToken,JWT_SECRET)

        if(!verifiedResponse){
            res.status(404).json({
                msg : "invalid token, please signin again!"
            })
            return;
        }
        res.send("here are your purchases : \ncourse-1\ncourse-2\ncourse-3")
    })

module.exports = {
    userrouter : userrouter
}