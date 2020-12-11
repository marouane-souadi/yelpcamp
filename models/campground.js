var mongoose    = require("mongoose");
//var Comment     = require("./comment");

var campSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }
    ],   
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        username : String
    }
});

module.exports = mongoose.model("campground", campSchema, "campground");