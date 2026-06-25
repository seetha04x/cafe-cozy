const Cafe=require("../models/cafe.js");
const axios= require("axios");
const Workspace=require("../models/workspace.js")
async function geocodeLocation(location){
    try{
        const geoRes=await axios.get("https://nominatim.openstreetmap.org/search",
            {
                params:{
                    format:"json",
                    q:location,
                },
                headers: {
                    "User-Agent": "AirBnb/1.0 (vrishchika2310@gmail.com)",
                },
                timeout: 10000,
            }
        );
        if(geoRes.data && geoRes.data.length>0){
            return [
                parseFloat(geoRes.data[0].lon),
                parseFloat(geoRes.data[0].lat),]
        }
    }catch(err){
        console.warn("Geocoding failed, using fallback coordinates:", err.message || err);
    }
    return [77.0, 9.96];//default coordinates
}

module.exports.index= async(req,res)=>{
    const all=await Cafe.find({});
    if(all.length==0) return res.render("./cafe/index.ejs",{});
    res.render("./cafe/index.ejs",{all});
}

module.exports.new= (req,res)=>{
    res.render("./cafe/new.ejs");//render new Form
}

module.exports.postNew=async (req,res)=>{
    let {name,description,location,state}=req.body;
    const coordinates= await geocodeLocation(location);
    let image=[];
    if(req.files && req.files.length>0){
        image=req.files.map(file=>({
            url:file.path,
            filename:file.filename
        }));
    }
    const newCafe=new Cafe({name,description,location,state,image});
    newCafe.geometry={
        type:"Point",
        coordinates,
    }
    console.log(newCafe);
    await newCafe.save();
    res.redirect("/cafes");
};

module.exports.show=async (req,res)=>{
    const {id}=req.params;
    const cafe=await Cafe.findById(id);
    const workspace=await Workspace.find({cafe:id})
    res.render("./cafe/show.ejs",{cafe,workspace});
};

module.exports.delete=async(req,res)=>{
    const {id}=req.params;
    const cafe=await Cafe.findByIdAndDelete(id);
    const workspace=await Workspace.deleteMany({cafe:id});
    res.redirect("/cafes");
}
module.exports.editForm=async(req,res)=>{
    const {id}=req.params;
    const cafe=await Cafe.findById(id);
    let originalImg=[];
    if(cafe.image && cafe.image.length>0){
        cafe.image.forEach(img=>{
            originalImg.push(img.url.replace("upload/","upload/h_200,w_200/"));
        });
    }
    console.log(originalImg);
    res.render("./cafe/edit.ejs",{cafe,originalImg});
}
module.exports.postEdit=async(req,res)=>{
    const {id}=req.params;
    const {name,description,location,state}=req.body;
    const cafeToUpdate=await Cafe.findById(id);
    const coordinates= await geocodeLocation(location);
    let image = cafeToUpdate.image || [];
    if(req.files && req.files.length>0){
        image=req.files.map(file=>({
            url:file.path,
            filename:file.filename
        }));
    }
    await Cafe.findByIdAndUpdate(id,{name,description,location,state,image,geometry:{type:"Point",coordinates}});
    res.redirect(`/cafes/${id}`);
}      