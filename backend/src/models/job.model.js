import mongoose, { Schema } from "mongoose";
const jobSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    wage:{
        type:Number,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    }
},{timestamps:true});

export const Job = mongoose.model("Job",jobSchema);