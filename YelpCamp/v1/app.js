var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
    res.render("landing.ejs"); 
});

var campgrounds = [
            {name: "Salmon Creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
            {name: "Granite Hill", image:"http://techiestuffs.com/wp-content/uploads/2017/08/camping-finland.jpg"},
            {name: "Mountain Goat's Rest", image:"https://squamishadventure.com/wp-content/uploads/2017/05/tommy-lisbin-211935.jpg"},
            {name: "Salmon Creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
            {name: "Granite Hill", image:"http://techiestuffs.com/wp-content/uploads/2017/08/camping-finland.jpg"},
            {name: "Mountain Goat's Rest", image:"https://squamishadventure.com/wp-content/uploads/2017/05/tommy-lisbin-211935.jpg"},
            {name: "Salmon Creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
            {name: "Granite Hill", image:"http://techiestuffs.com/wp-content/uploads/2017/08/camping-finland.jpg"},
            {name: "Mountain Goat's Rest", image:"https://squamishadventure.com/wp-content/uploads/2017/05/tommy-lisbin-211935.jpg"},
            {name: "Salmon Creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
            {name: "Granite Hill", image:"http://techiestuffs.com/wp-content/uploads/2017/08/camping-finland.jpg"},
            {name: "Mountain Goat's Rest", image:"https://squamishadventure.com/wp-content/uploads/2017/05/tommy-lisbin-211935.jpg"},
            {name: "Salmon Creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
            {name: "Granite Hill", image:"http://techiestuffs.com/wp-content/uploads/2017/08/camping-finland.jpg"},
            {name: "Mountain Goat's Rest", image:"https://squamishadventure.com/wp-content/uploads/2017/05/tommy-lisbin-211935.jpg"},
            {name: "Salmon Creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
            {name: "Granite Hill", image:"http://techiestuffs.com/wp-content/uploads/2017/08/camping-finland.jpg"},
            {name: "Mountain Goat's Rest", image:"https://squamishadventure.com/wp-content/uploads/2017/05/tommy-lisbin-211935.jpg"}
        ];

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds.ejs", {campgrounds: campgrounds}) // {campgrounds: campgrounds} first argument is name we give it, 2nd is data we are passing in
});

app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res) {
   res.send("SHOW PAGE SOON~");
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("YelpCamp Server has Started.."); 
});