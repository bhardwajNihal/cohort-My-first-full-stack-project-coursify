
const Router = require("express")
const userrouter = Router()
const { userModel } = require("../db")

// all the route handlers for request on /user endpoint
    userrouter.post("/signup", (req,res)=>{
        res.json({
            msg : "user signed up succesfully!"
        })
    })

    userrouter.post("/signin", (req,res)=>{
        res.json({
            msg : "user signed in succesfully!"
        })
    })

    userrouter.get("/purchases", (req,res)=>{             //endpoint to see all the purchased course
        res.json({
            msg : "your purchased courses"
        })
    })

module.exports = {
    userrouter : userrouter
}