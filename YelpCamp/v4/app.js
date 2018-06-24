var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var seedDB = require("./seeds.js")
var Comment = require("./models/comment.js");
// var User = require("/models/user.js");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

app.get("/", function(req, res) {
    res.render("landing.ejs"); 
});



// Campground.create( 
//     {
//         name: "Granite Hill", 
//         image: "https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg",
//         description: "Just a huge granite gill."
        
//     }, function(err, campground) {
//       if(err) {
//           console.log(err)
//       } 
//       else {
//           console.log("added " + campground)
//       }
//     }
// );

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
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
app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
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
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
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

//COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } 
       else {
          Comment.create(req.body.comment, function(err, comment) {
             if(err) {
                 console.log(err);
             }
             else {
                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/campgrounds/" + campground._id);
             }
          });
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("YelpCamp Server has Started.."); 
});