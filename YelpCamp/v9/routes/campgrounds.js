var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js")

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
router.post("/", isLoggedIn, function(req, res) {
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
           console.log(newCampground);
           res.redirect("/campgrounds");
       }
   })
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err) {
            console.log(err);
        }
        else {
            // console.log(foundCampground);
            res.render("campgrounds/show.ejs", {campground: foundCampground});
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;