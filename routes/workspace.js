const Cafe=require("../models/cafe.js");
const Workspace=require("../models/workspace.js")
const express=require("express");
const router=express.Router();
const workController=require("../controllers/workspace.js");
const {isLoggedin, isOwner, validateListing}=require("../middleware.js");

router.route("/")
.post(isLoggedin, wrapAsync(workController.newPost));
router.get("/:id/edit",isLoggedin, wrapAsync(workController.editForm));
router.route("/:id")
.get(wrapAsync(workController.show))
.delete(isLoggedin, wrapAsync(workController.delete))
.put(isLoggedin, wrapAsync(workController.editPost));


router.get("/new/:id",isLoggedin,workController.newForm);
module.exports=router;