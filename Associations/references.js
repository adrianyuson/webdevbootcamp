var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post.js");
var User = require("./models/user.js");

Post.create({
    title: "Cooking Recipes part 4",
    content: "The Dark Soup"
}, function(err, post) {
    if(err) {
        console.log(err);
    }
    else {
        User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
        if(err) {
              console.log(err);
          } 
          else {
              foundUser.posts.push(post);
              foundUser.save(function(err, data) {
                  if(err) {
                      console.log(err);
                  }
                  else {
                      console.log(data);
                  }
              });
          }
        });
    }
});

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Matthews"
// });

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });