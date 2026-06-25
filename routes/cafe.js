const Cafe=require("../models/cafe.js");
const express=require("express");
const router=express.Router();
const cafeController=require("../controllers/cafe.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

router.route("/")
    .get( cafeController.index)//display all cafes
    .post( upload.array("image"),cafeController.postNew);

router.get("/new",cafeController.new); 
router.route("/:id")
    .get(cafeController.show)//to display individual listing
    .delete(cafeController.delete)//to delete individual listing
    .put(upload.array("image"),cafeController.postEdit)

router.get("/:id/edit",cafeController.editForm);//to edit individual listing    
module.exports=router;