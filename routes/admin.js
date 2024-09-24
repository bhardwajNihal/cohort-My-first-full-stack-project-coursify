
const Router = require("express")
const adminrouter = Router()
const { adminModel } = require("../db")

adminrouter.post("/signup", (req,res)=>{
    res.send("admin signed up successfully!")
})

adminrouter.post("/signin", (req,res)=>{
    res.send("admin signed in successfully!")
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