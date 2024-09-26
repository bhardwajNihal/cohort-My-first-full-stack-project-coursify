const Router = require("express")
const courserouter = Router();
const { courseModel } = require("../db")
const { purchaseModel } = require("../db")
const { userAuth } = require("../middlewares/user");


courserouter.get("/preview", async(req,res)=>{               //endpoint to see all couses available
    
    const courses = await courseModel.find({});

    res.json({
        courses
    })  
})

courserouter.post("/purchase",userAuth, async(req,res)=>{             //endpoint to purchase a course
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        courseId,
        userId
    })

    res.json({
        msg : "course purchased successfully!"
    })
})


module.exports = {
    courserouter : courserouter
}