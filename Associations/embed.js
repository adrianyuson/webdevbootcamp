var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});
var User = mongoose.model("User", userSchema);



// var newUser = new User({
//    email: "tinalima@yahoo.com",
//    name: "Tina Lima"
// });

// newUser.posts.push({
//    title: "How to bake a cake.",
//    content: "Important Steps"
// });
// newUser.save(function(err, user) {
//    if(err) {
//       console.log(err);
//    }
//    else {
//       console.log(user);
//    }
// });

// var newPost = new Post({
//    title: "Essence",
//    content: "Time is of the essence"
// });
// newPost.save(function(err, post) {
//    if(err) {
//       console.log(err);
//    }
//    else {
//       console.log(post);
//    }
// });

// User.findOne({name: "Tina Lima"}, function(err, user) {
//    if(err) {
//       console.log(err);
//    }
//    else {
//       user.posts.push({
//          title: "Life In Mars",
//          content: "Struggles and challenges"
//       });
//       user.save(function(err, user) {
//          if(err) {
//             console.log(err);
//          }
//          else {
//             console.log(user);
//          }
//       });
//    }
// });

User.findOne({name: "Tina Lima"}).populate("posts").exec(function(err, user) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(user);
    }
});