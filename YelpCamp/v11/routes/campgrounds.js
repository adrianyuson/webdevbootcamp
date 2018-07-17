var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("./campgrounds/index.ejs", {campgrounds: allCampgrounds}) // {campgrounds: campgrounds} first argument is name we give it, 2nd is data we are passing in
        }
    })
});

//CREATE - add new campground to the db
router.post("/", middleware.isLoggedIn, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author};
   Campground.create(newCampground, function(err, newCampground) {
       if(err) {
           console.log(err);
       }
       else {
           res.redirect("/campgrounds");
       }
   })
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        }
        else {
            res.render("campgrounds/show.ejs", {campground: foundCampground});
        }
    });
});

//EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit.ejs", {campground: foundCampground});
    }); 
});

//UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
     if(err) {
         res.redirect("/campgrounds");
     }  
     else {
         res.redirect("/campgrounds/" + res.params.id);
     }
   });
});

//DESTROY Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err) {
          res.redirect("/campgrounds");
      }
      else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;