const Cafe=require("./models/cafe.js");
const workspace=require("./models/workspace.js");
const ExpressError=require("./utils/ExpressError.js");
const {cafeSchema, workSchema}=require("./schema.js");
function isLoggedin(req,res,next){
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    } 
    next();
}   
function saveRedirectUrl(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next(); 
}

async function isOwner(req,res,next){
    const {id}= req.params;
    const cafe= await Cafe.findById(id);
     if(!(res.locals.currUser._id.equals(cafe.owner._id))){
            req.flash("error", "You dont have the access!");
            return res.redirect(`/cafes/${id}`);
        }
      next();  
}

const validateCafe=(req,res,next)=>{
    const result = cafeSchema.validate(req.body, { abortEarly: false });
    if(result.error){
        const msg = result.error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(msg, 400));
    }
    next();
}
const validateWork=(req,res,next)=>{
    let result=workSchema.validate(req.body);
    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        throw next(new ExpressError(msg, 400));
    }else{
        next();
    }
}
module.exports={ isLoggedin,saveRedirectUrl, isOwner,validateCafe,validateWork};