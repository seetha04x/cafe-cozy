const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const workspaceSchema=new Schema({
    cafe:{
        type:Schema.Types.ObjectId,
        ref:"cafe",
    },
    description:String,
    price:Number,
    reviews:[
        {type:Schema.Types.ObjectId,
         ref:"review",
        }
    ],
    category:{
        type:String,
        enum:["desk","conference room","book space","cabin"],
        default:"desk",
        required:true,
    }
});

const workspace=mongoose.model("workspace", workspaceSchema);
module.exports=workspace;
