var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name: "Tesee",
//   age: 3,
//   temperament: "Evil"
// });

// george.save(function(err, cat) {
//     if(err) {
//         console.log("error saving george");
//     }
//     else {
//         console.log("saved cat to db")
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Last Cat",
//     age: 14,
//     temperament: "Breedy"
// }, function(err, cat) {
//     if(err) {
//         console.log("error creating new cat!");
//     }
// });

Cat.find({}, function(err, cats) {
    if(err) {
        console.log("error finding");
        console.log(err);
    }
    else {
        console.log("All the cats...")
        console.log(cats);
    }
});