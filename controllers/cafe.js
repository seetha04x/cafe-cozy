const Cafe=require("../models/cafe.js");
const axios= require("axios");

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

module.exports.new=(req,res)=>{
    res.render("./cafe/new.ejs");//render new Form
}

module.exports.postNew=async (req,res)=>{
    let {name,description,url, location}=req.body;
    const coordinates= await geocodeLocation(location);
    const newCafe=new Cafe({name,description,location,});
    newCafe.geometry={
        type:"Point",
        coordinates,
    }
    newCafe.image={
        url,
        filename:"cafeImage",
    },
    await newCafe.save();
    res.redirect("/cafes");
};

module.exports.show=async (req,res)=>{
    const {id}=req.params;
    const cafe=await Cafe.findById(id);
    res.render("./cafe/show.ejs",{cafe});
};