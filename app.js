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
const passport=require("passport");
const LocalStrategy=require("passport-local");
const user=require("./models/user.js");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const MongoStore=require("connect-mongo");

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    touchAfter: 24 * 3600,
});

store.on("error",(err)=>{
    console.log("Error in Mongo Session store", err);
});

const sessionConfig = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

mongoose.set("strictQuery", false);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

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

app.all(/.*/,(req,res,next)=>{
    next(new ExpressError("Page Not Found", 404));
})

app.use((err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }
    const {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{err});
})


