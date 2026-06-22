const mongoose=require("mongoose");
const workspace = require("./workspace");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    comment:{
        type: String,
        default:"No reviews yet",  
        required: true},
    rating:{
        default: 3,
        type: Number,
        min: 1,
        max: 5,
    },
    workspace:{
        type:Schema.Types.ObjectId,
        ref:"workspace",
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})
const review= mongoose.model("review", reviewSchema);
module.exports= review;
