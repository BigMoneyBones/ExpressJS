var express = require("express");
var router = express.Router();

var blogs = require("../public/javascripts/sampleBlogs");
const blogPosts = blogs.blogPosts;

/* GET Blogs listing. */
router.get("/", function (req, res, next) {
  // Set 'title' key value to "Blogs" ... render applies to blogs.ejs file??
  res.render("blogs", { title: "Blogs" });
});

router.get("/all", function (req, res, next) {
  let sort = req.query.sort;
  res.json(sortBlogs(sort));
});

router.get("/singleBlog/:blogId", (req, res, next) => {
  console.log(req.params);
  const blogId = req.params.blogId;
  //JSON: Javascript Object Notation
  res.json(findBlogId(blogId));
});

router.get("/postBlog", function (req, res, next) {
  res.render("postBlog");
});

router.post("/submit", (req, res, next) => {
  res.status(201);
  let newBlog = addBlogPost(req.body);
  blogPosts.push(newBlog);
  console.log(blogPosts);
});

// Display Blogs Router
router.get("/displayBlogs", (req, res, next) => {
  res.render("displayBlogs");

  // Attempting Stretch Goal

  // Attempting Stretch Goal
});

// Display Single Blog Router
router.get("/displaySingleBlog", (req, res, next) => {
  res.render("displaySingleBlog");
})

// Delete Single Blog Router
router.delete("/deleteblog/:blogId", (req, res, next) => {
  const blogToDelete = req.params.blogId;
    for(let i = 0; i < blogPosts.length; i++) {
      let blog = blogPosts[i];
      if (blog.id === blogToDelete) {
        blogPosts.splice(i,1);
      }
    }
    res.json("successfully deleted")
})

/* HELPER FUNCTIONS */

// Find Blog Id
// Take 'id' from object in 'blogs' array as a parameter.
let findBlogId = (id) => {
  for (let i = 0; i < blogPosts.length; i++) {
    // At each iteration of blogs array
    let blog = blogPosts[i];
    if (blog.id === id) {
      return blog;
    }
  }
};

// Sort Blog Array into ascending or descending order
let sortBlogs = (order) => {
  if (order === "asc") {
    return blogPosts.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else if (order === "desc") {
    return blogPosts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else {
    return blogPosts;
  }
};

let addBlogPost = (body) => {
  let id = blogPosts.length + 1;
  newDate = new Date();
  let blog = {
    createdAt: newDate.toISOString(),
    title: body.title,
    text: body.text,
    author: body.author,
    id: id.toString(),
  };
  return blog;
};

module.exports = router;
