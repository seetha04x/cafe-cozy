const express=require("express");
const router = express.Router({ mergeParams: true });

const Booking=require("../models/booking.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedin}=require("../middlewares.js");
const bookingController=require("../controllers/booking.js");

router.route("/")
.get(isLoggedin,wrapAsync(bookingController.bookingForm))
.post(isLoggedin,wrapAsync(bookingController.booking))

router.delete("/:idBooking", isLoggedin, wrapAsync(bookingController.delete));
router.route("/all")
.get(isLoggedin,wrapAsync(bookingController.bookingAll))

module.exports=router;
