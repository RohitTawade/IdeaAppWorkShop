const express  = require('express');
const serverConfig =require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');
const bcrypt = require('bcrypt');


const app = express();
/**
 * Logic to connect to MongoDB and create an ADMIN user
 * Need to have the mongodb up and running in your local machine
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection ;

db.on("error", ()=>{
    console.log("Error while connecting to DB");
});

db.once("open", ()=>{
    console.log("DB is connected");
})
    
    /**
     * Check if the admin user is already present
     */
    
app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on the port number ${serverConfig.PORT}` );
    init();
})

async function  init(){

    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.findOne({
        userId : "admin"
    })
    if(admin) {
        console.log("Admin user already present");
        return;
    }
    /**
     * Initilize the mongo db
     * 
     * Need to create the Admin User
     */
   admin = await userModel.create({
        name:"Rohit Tawade",
        userId:"admin",
        email:"rohittavade55@gmail.com",
        userType:"ADMIN",
        password:"Welcome1"
    })

    console.log(admin);
}
