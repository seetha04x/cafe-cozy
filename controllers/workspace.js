
const Workspace=require("../models/workspace.js");
const Cafe=require("../models/cafe.js");

module.exports.show=async (req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findById(id);
    console.log(workspace);
    res.render("./workspace/show.ejs",{workspace});
}
module.exports.delete=async(req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findByIdAndDelete(id);
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
    res.redirect(`/cafes/${workspace.cafe.id}`);
}