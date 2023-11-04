const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://BitwiseCoders:12345679@sagar.gcsjvcm.mongodb.net/";

const connectMongo = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongo connected successfully");
    } catch (error) {
        console.log(`Mongo not connected: ${error}`);
    }
    
}

module.exports = connectMongo;