import express from "express";
import bodyParser from "body-parser";
import { format } from "timeago.js";

const app = express();
const port = 3000;
const post = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Default main page
app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: post,
    format,
  }); // Render page with posts array and time formatter
});

// Users post submission and add to array of posts
app.post("/submit", (req, res) => {
  // Add user form submission into an array
  post.unshift({
    author: req.body["name"],
    content: req.body["content"],
    title: req.body["title"],
    dateCreated: new Date(),
  });
  res.redirect("/"); // Reload main page
});

// Update the post once the user submits changes
app.post("/updatePost", (req, res) => {
  const postIndex = parseInt(req.query.index); // Grab index from query
  // Using the specific index, save the changes from the form into the array
  post[postIndex] = {
    author: req.body["name"],
    content: req.body["content"],
    title: req.body["title"],
    dateCreated: post[postIndex].dateCreated,
  };
  res.redirect("/"); // Reload main page
});

// Remove the post from the array
app.post("/delete", (req, res) => {
  const postIndex = parseInt(req.query.index); // Grab index from query
  post.splice(postIndex, 1); // Remove the post in the array at index specified and only remove that one item
  res.redirect("/"); // Reload main page
});

// Start the server locally
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
