import mongoose, { Mongoose } from "mongoose";

export const dbconnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Restuarant"
    }).then(()=>{
        console.log("Connected to db sucessfully")
    }).catch((err)=>{
        console.log(`someeroor occured during connnection ${err}`)
    })
    
}