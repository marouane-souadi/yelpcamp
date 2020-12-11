var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// Index Route
router.get("/", function(req, res){
    Campground.find({}, function(err, results){
        if (err) console.log(err);
        else res.render("campgrounds/index", {campgrounds : results});
    })
    
});

// New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    res.render("campgrounds/new");
});

//Create Route
router.post("/", middleware.isLoggedIn,function(req, res){
    var newCampground = req.body.campground;
    newCampground.author = {
        id : req.user._id,
        username : req.user.username
    } ;
    Campground.create(newCampground, function(err, result){
        if (err) console.log(err);
        else {
            res.redirect("/campgrounds");
        }
    });
    
});

//Show Route
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) console.log(err);
        else res.render("campgrounds/show", {campground : foundCampground});
    });
    
});

//Edit Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){

        Campground.findById(req.params.id,function(err, foundCampground){
            res.render("campgrounds/edit", {campground : foundCampground});   
        })
        
});

//Update Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) console.log(err);
        else {
            res.redirect("/campgrounds/"+updatedCampground._id);
        }
    });
});

//Delete Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            foundCampground.comments.forEach(function(comment){
                Comment.findByIdAndRemove(comment._id, function(err){
                    if (err) console.log(err);
                });
            });
            foundCampground.remove();
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;