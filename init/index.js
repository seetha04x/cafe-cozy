if (process.env.NODE_ENV!="production"){
    require("dotenv").config({ path: "../.env" });
}
const dbUrl = process.env.ATLASDB_URL;

const mongoose=require("mongoose");
const indata=require("./data.js");
const cafe=require("../models/cafe.js");

async function main(){
    await mongoose.connect(dbUrl);
}
main()
.then(()=>{
    console.log("connected to database cafecosy.");
    return initDB();
})
.catch((err)=>{
    console.log("error: ",err);
})

async function initDB(){
    await cafe.deleteMany({});
    console.log("Old cafe data cleared.");

    await cafe.insertMany(indata.cafe);
    console.log("data initialised.")
}
