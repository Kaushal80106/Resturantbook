import mongoose from "mongoose";
import validator from 'validator'

const reservationSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"firstname must contain at least 3 characters"],
        maxLength:[30,"firstname cannot exceed above 30 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"firstname must contain at least 3 characters"],
        maxLength:[30,"firstname cannot exceed above 30 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"provide a valid email"]
    },
    phone:{
        type:String,
        required: true,
        minLength:[10,"Phone No must contain at least 10 characters"],
        maxLength:[10,"Phone no cannot exceed above 10 characters"]
   },
   time:{
    type:String,
    required:true,

   },
   date:{
    type:String,
    required:true,
   },
});

export const Reservation = mongoose.model("Reservation",reservationSchema)