const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
    },
    username:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    tag:{
        type:String,
        default:"Served"
    },
    rollno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    exptime:{
        type:Number,
        required:true
    }
})

const Attendance = mongoose.model("attendance",attendanceSchema);
module.exports = Attendance;