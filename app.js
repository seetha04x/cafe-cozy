if (process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Cafe=require("./models/cafe.js");

async function main(){
    console.log(process.env.ATLASDB_URL);
    await mongoose.connect(process.env.ATLASDB_URL);
}
main()
.then(()=>{
    console.log("Connected to database CafeCozy.");
})
.catch((err)=>{
    console.log("Error: ",err);
})

app.get("/cafes",async (req,res)=>{
    const all= await Cafe.find({});
    if(all.length ==0) {
        return res.send("No cafes available right now");}
    res.send("Hug&Mug,BobaLive,BunBoy");
})
app.listen(2310,()=>{
    console.log("Listening to port 2310...");
})