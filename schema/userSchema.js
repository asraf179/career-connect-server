const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
        email:{
                type:String,
                required:true,
        },
        password:{
                type:String,
                required:true,
        },
        status:{
                type:String,
                enum:["active,inactive"],
        }
})
module .exports=userSchema;