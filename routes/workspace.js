const Cafe=require("../models/cafe.js");
const Workspace=require("../models/workspace.js")
const express=require("express");
const router=express.Router();
const workController=require("../controllers/workspace.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin, isOwner, validateWork}=require("../middlewares.js");

router.route("/")
.post(isLoggedin, validateWork, wrapAsync(workController.newPost));

router.get("/booking",isLoggedin,wrapAsync(workController.bookingAll));

router.get("/:id/edit",isLoggedin, wrapAsync(workController.editForm));
router.route("/:id")
.get(wrapAsync(workController.show))
.delete(isLoggedin, wrapAsync(workController.delete))
.put(isLoggedin, validateWork,wrapAsync(workController.editPost));

router.route("/:id/booking")
    .get(isLoggedin, wrapAsync(workController.bookingForm))
    .post(isLoggedin, wrapAsync(workController.booking));

router.get("/new/:id",isLoggedin,workController.newForm);

module.exports=router;