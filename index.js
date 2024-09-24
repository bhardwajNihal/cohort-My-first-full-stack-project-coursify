// importing modules
const express = require("express")
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// a more cleaner approach to define routes

// importing well defined router objects from other files
const { userrouter } = require("./routes/user")
const { courserouter } = require("./routes/course")
const { adminrouter } = require("./routes/admin")

// using the routes according to the initial endpoint
app.use("/user", userrouter);
app.use("/course", courserouter);
app.use("/admin", adminrouter)


app.listen(port,()=>{
    console.log("server listening on port ",port);
    
});
