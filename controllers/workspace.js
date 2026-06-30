
const Workspace=require("../models/workspace.js");
const Cafe=require("../models/cafe.js");
const Booking=require("../models/booking.js");

module.exports.show=async (req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findById(id);
    if(!workspace){
        req.flash("error","Workspace not found");
        return res.redirect("/cafes");
    }
    console.log(workspace);
    res.render("./workspace/show.ejs",{workspace});
}
module.exports.delete=async(req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findByIdAndDelete(id);
    if(!workspace){ 
        req.flash("error","Workspace not found");
        return res.redirect("/cafes");
    }else{
        req.flash("success","Successfully deleted the Workspace");
    }
    res.redirect(`/cafes/${workspace.cafe}`);
}   
module.exports.newForm=(req,res)=>{
    const {id}=req.params;
    res.render("./workspace/new.ejs",{cafe: id});
} 
module.exports.newPost=async (req,res)=>{
    const {cafe,category,price,description}=req.body;
    const newWorkspace=new Workspace({cafe,category,price,description});
    await newWorkspace.save();
    if(newWorkspace){
        req.flash("success","Successfully added a new Workspace");
    }else{
        req.flash("error","Failed to add Workspace");
    }
    res.redirect(`/cafes/${cafe}`);
}
module.exports.editForm=async (req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findById(id);
    const cafe=await Cafe.findById(workspace.cafe);
    res.render("./workspace/edit.ejs",{workspace,cafe:cafe._id});
}
module.exports.editPost=async (req,res)=>{
    const {id}=req.params;
    const {category,price,description}=req.body;
    const workspace=await Workspace.findByIdAndUpdate(id,{category,price,description}).populate("cafe");
    if(!workspace){
        req.flash("error","Workspace not found");
        return res.redirect("/cafes");
    }
    req.flash("success","Successfully updated the Workspace");      
    res.redirect(`/cafes/${workspace.cafe.id}`);
}
module.exports.bookingAll=async (req,res)=>{
    const bookings=await Booking.find({user:req.user._id}).populate({path:"workspace", populate:{path:"cafe"}});
    if(bookings.length===0){
        
        return res.render("./workspace/bookingAll.ejs",{message:"You don't have any bookings yet"});
    }
    res.render("./workspace/bookingAll.ejs",{bookings,message:""});
}
