
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function adminAuth(req,res,next){

    const token = req.headers.token;

    const verifiedAdmin = jwt.verify(token,JWT_SECRET_ADMIN);

    if(!verifiedAdmin){
        res.status(403).json({
            msg : "invalid token! please sign in again!"
        })
        return;
    }
    req.id = verifiedAdmin.id;
    next();    
}

module.exports = {
    adminAuth
}