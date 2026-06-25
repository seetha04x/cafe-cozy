if (process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
app.use(express.static('public'));
const mongoose=require("mongoose");
const Cafe=require("./models/cafe.js");
const cafeRouter=require("./routes/cafe.js");
const workRouter=require("./routes/workspace.js")
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const multer=require("multer");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))

async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}
main()
.then(()=>{
    console.log("Connected to database CafeCozy.");
    app.listen(2310,()=>{
    console.log("Listening to port 2310...");
})
})
.catch((err)=>{
    console.log("Error: ",err);
})

app.use("/cafes",cafeRouter);
app.use("/workspaces",workRouter);
