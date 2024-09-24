const Router = require("express")
const courserouter = Router();

courserouter.get("/preview", (req,res)=>{               //endpoint to see all couses available
    res.send("here are all the courses available")
})

courserouter.post("/purchase", (req,res)=>{             //endpoint to purchase a course
    res.send("make payment to purchase the course")
})


module.exports = {
    courserouter : courserouter
}