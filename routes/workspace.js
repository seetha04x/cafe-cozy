const Cafe=require("../models/cafe.js");
const Workspace=require("../models/workspace.js")
const express=require("express");
const router=express.Router();
const workController=require("../controllers/workspace.js");

router.route("/")
.post(workController.newPost);
router.get("/:id/edit",workController.editForm);
router.route("/:id")
.get(workController.show)
.delete(workController.delete)
.put(workController.editPost);


router.get("/new/:id",workController.newForm);
module.exports=router;