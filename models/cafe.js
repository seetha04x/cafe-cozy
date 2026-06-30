const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const cafeSchema=new Schema({
    name:String,
    description:String,
    image:[{
        url:String,
        filename:String,
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    location:{
        type:String,
    required:true} ,
    state:{
        type:String,
    required:true},
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true,
            default:"Point",
        },
        coordinates:{
            type:[Number],
            required:true,
            default:[77.0,9.96], 
        }
    }
});
const cafe=mongoose.model("cafe",cafeSchema,"cafes");
module.exports=cafe;
