if (process.env.NODE_ENV!="production"){
    require("dotenv").config({ path: "../.env" });
}
const dbUrl = process.env.ATLASDB_URL;

const mongoose=require("mongoose");
const indata=require("./data.js");
const cafe=require("../models/cafe.js");
const workspace=require("../models/workspace.js")

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
  
    await cafe.insertMany(indata.cafe);

    // await workspace.insertMany(indata.workspaces);
    console.log("data initialised.")
}
