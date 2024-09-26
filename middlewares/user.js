
const jwt = require('jsonwebtoken')
require("dotenv").config();
const JWT_SECRET_USER = process.env.JWT_SECRET_USER


function userAuth(req,res,next){
    const token = req.headers.token;

    const verifiedUser = jwt.verify(token,JWT_SECRET_USER);

    if(!verifiedUser){
        res.status(403).json({
            msg : "invalid token, Please sign in again!"
        })
        return;
    }
    req.userId = verifiedUser.id;
    next();
}

module.exports = {
    userAuth
}