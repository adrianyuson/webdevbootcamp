var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Test app");
});

app.get('/bye', function (req, res) {
    res.send("Exiting..."); 
});

app.get('/dog', function (req,res) {
   console.log("Someone made a request to /dog")
   res.send("Dog Website!");
});

app.get("/r/:subredditName", function(req, res) {
   var subreddit = req.params.subredditName;
   res.send("Welcome to the " + subreddit.toUpperCase() + " Subreddit"); 
   
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
   console.log(req.params);
   res.send("Welcome to a comments page!"); 
});

app.get("*", function (req, res) {
   res.send("You are a star!"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started..");
});