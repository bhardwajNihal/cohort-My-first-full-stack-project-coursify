// importing modules
const express = require("express")
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 3000;
const mongodb_connectionString = process.env.mongodb_connectionString;

app.use(express.json())
// a more cleaner approach to define routes

// importing well defined router objects from other files
const { userrouter } = require("./routes/user")
const { courserouter } = require("./routes/course")
const { adminrouter } = require("./routes/admin")

// using the routes according to the initial endpoint
app.use("/user", userrouter);
app.use("/course", courserouter);
app.use("/admin", adminrouter)

// to make sure that the server is successfully connected to database before starting to listen
async function connectToDb_thenStartServer(){
    try{
        await mongoose.connect(mongodb_connectionString);
        console.log('connected to database successfully!');
        
        app.listen(port,()=>{
            console.log("server listening on port ",port);
        });
        
    }catch(e){
        console.log("failed to connect to db", e);
    }
}

connectToDb_thenStartServer();


