const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

require('dotenv').config();
const mongodb_connectionString = process.env.mongodb_connectionString;

(async function connectToDb(){
    await mongoose.connect(mongodb_connectionString);
}) ()


//defining schemas
const userSchema = new Schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})
const adminSchema = new Schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId,
})

const purchaseSchema = ({
    courseId : ObjectId,
    userId : ObjectId
})

// defining models 

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

// exporting models 
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}