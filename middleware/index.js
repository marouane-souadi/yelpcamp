// All middleware here
var Comment = require("../models/comment");
var Campground = require("../models/campground");

var middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first!");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req, res, next)
{
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id,function(err, foundCampground){
            if (err) {
                console.log(err);
                req.flash("error", "campgound not found");
                res.redirect("back");
            }
            else {
                if (foundCampground.author.id.equals(req.user._id))
                    next();                
                else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("/campgrounds/"+red.params.id);
                }
            }
        });

    }
    else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next)
{
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id,function(err, foundComment){
            if (err) {
                console.log(err);
                req.flash("error", "comment not found");
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user._id))
                    next();                
                else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("/campgrounds/"+req.params.id);
                }
            }
        });

    }
    else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
}

module.exports = middlewareObj;