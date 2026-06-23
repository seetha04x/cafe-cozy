const Cafe=require("../models/cafe.js");
const express=require("express");
const router=express.Router();
const cafeController=require("../controllers/cafe.js");

router.route("/")
    .get( cafeController.index)//display all cafes
    .post(cafeController.postNew);

router.get("/new",cafeController.new); 
router.route("/:id")
    .get(cafeController.show)//to display individual listing
    // .post(cafeController.postEdit)


module.exports=router;