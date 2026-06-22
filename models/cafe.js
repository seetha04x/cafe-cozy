const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const cafeSchema=new Schema({
    name:String,
    description:String,
    image:{
        url:String,
        filename:String,
    },
    location:String,
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
