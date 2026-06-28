const User=require("../models/user");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");


module.exports.signupForm=(req,res)=>{
    res.render("./user/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const user=new User({username,email});
        const registeredUser=await User.register(user,password);
        passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to CafeCozy!");
            res.redirect("/cafes");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm=(req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.login=(req,res)=>{
    req.flash("success","Welcome back!");
    const redirectUrl=req.session.redirectUrl || "/cafes";
    res.redirect(redirectUrl);
}               
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){     
            return next(err);
        }   
        req.flash("success","Goodbye!");
        res.redirect("/cafes");
    });
}       