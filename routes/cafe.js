const Cafe=require("../models/cafe.js");
const express=require("express");
const router=express.Router();
const cafeController=require("../controllers/cafe.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedin, isOwner, validateListing}=require("../middleware.js");

router.route("/")
    .get( wrapAsync(cafeController.index))//display all cafes
    .post(isLoggedin, upload.array("image"),wrapAsync(cafeController.postNew));

router.get("/new",isLoggedin, cafeController.new); 
router.route("/:id")
    .get(wrapAsync(cafeController.show))//to display individual listing
    .delete(isLoggedin, isOwner, wrapAsync(cafeController.delete))//to delete individual listing
    .put(isLoggedin, isOwner, upload.array("image"), wrapAsync(cafeController.postEdit))

router.get("/:id/edit",isLoggedin, isOwner,         wrapAsync(cafeController.editForm));//to edit individual listing    
module.exports=router;