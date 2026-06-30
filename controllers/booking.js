const Workspace=require("../models/workspace.js");
const Cafe=require("../models/cafe.js");
const Booking=require("../models/booking.js");

module.exports.bookingForm=async (req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findById(id);
    if (!workspace) {
    req.flash("error", "Workspace not found.");
    return res.redirect("/cafes");
  }
    res.render("./workspace/booking.ejs",{workspace});
}
module.exports.booking=async (req,res)=>{
    const {id}=req.params;
    const workspace=await Workspace.findById(id);
    const {date,time}=req.body;
    const [startTime, endTime] = time.split('-');
    const overlappingBooking = await Booking.findOne({
        workspace: id,
        date: new Date(date),
        status: "confirmed",
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    });
    if(overlappingBooking){
        console.log("Overlapping booking found:", overlappingBooking);
        req.flash("error","The selected time slot is already booked.");
        return res.redirect(`/workspaces/${id}/booking`);
    }  
     const booking=new Booking({
        workspace:id,
        user:req.user._id,
        date: new Date(date),
        startTime,
        endTime,
        status:"confirmed"
    });
    await booking.save();
    req.flash("success","Booking confirmed successfully.");
    res.redirect(`/cafes/${workspace.cafe}`);
}
module.exports.delete=async (req,res)=>{
    const {id,idBooking}=req.params;
    let booking=await Booking.findByIdAndDelete(idBooking);
    let workspace=await Workspace.findById(id)
    if(!booking){
        req.flash("error","No such booking!");
        return res.redirect("/workspaces/booking");
    }
    req.flash("success","Booking deleted")
    res.redirect("/workspaces/booking");

}