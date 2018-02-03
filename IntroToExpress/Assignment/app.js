var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Welcome to my assignment.");
});

app.get('/speak/:animal', function (req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink~",
        cow: "Moo~",
        dog: "Woof~",
        cat: "Meow~"
    }
    var sound = sounds[animal];
    res.send(animal + " says " + sound);
});

app.get('/speak/cow', function (req, res) {
    res.send("The cow says 'Moo'");
});

app.get('/speak/cow', function (req, res) {
    res.send("The cow says 'Moo'");
});

app.get('/repeat/:string/:count', function (req, res) {
    var count = req.params.count;
    var string = req.params.string;
    var content = "";
    for(var i = 0; i < count; i++) {
        content += string + " ";
    }
    res.send(content);
});

app.get('*', function (req, res) {
    res.send("Page not found.");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started..");
});