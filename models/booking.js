const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const bookingSchema=new Schema({
    workspace:{
        type:Schema.Types.ObjectId,
        ref:"workspace",
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    date:{
        type:Date,
        required:true,
    },
    startTime: { 
        type: String, 
        required: true },
    endTime: { 
        type: String, 
        required: true },   // e.g., "17:00"
    status: { 
        type: String, enum: ['pending', 'confirmed', 'cancelled'], 
        default: 'pending' }
})

const booking=mongoose.model("booking",bookingSchema);
module.exports=booking;