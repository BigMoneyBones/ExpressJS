var express = require("express");
var router = express.Router();

var blogs = require("../public/javascripts/sampleBlogs");
const blogPosts = blogs.blogPosts;

const { blogsDB } = require("../mongo");
const { Db } = require("mongodb");

/* GET Blogs listing. */

// router.get("/", function (req, res, next) {
//   // Set 'title' key value to "Blogs" ... render applies to blogs.ejs file??
//   res.render("blogs", { title: "Blogs" });
// });

router.get("/", async function (req, res, next) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const blogs50 = await collection.find({}).toArray();
    res.json(blogs50);
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

// router.get("/all", function (req, res, next) {
//   let sort = req.query.sort;
//   res.json(sortBlogs(sort));
// });

router.get("/all", async function (req, res, next) {
  try {
    let sortField = req.query.sortField;
    let sortOrder = req.query.sortOrder;
    if (sortOrder === "asc") {
      sortOrder = 1;
    }
    if (sortOrder === "desc") {
      sortOrder = -1;
    }
    const collection = await blogsDB().collection("blogs50");
    const blogs50 = await collection
      .find({})
      .sort({
        [sortField]: sortOrder,
      })
      .toArray();
    res.json(blogs50);
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

// Display Single blod by id router
router.get("/singleBlog/:blogId", async function (req, res, next) {
  try {
    const blogId = Number(req.params.blogId) - 1;
    const collection = await blogsDB().collection("blogs50");
    // const blogs50 = await collection.findOne({ id: Number(blogId) });
    const blogs = await collection.find({}).toArray();
    const foundBlog = blogs[blogId];
    // console.log(req.params);
    // findBlogId is a helper function
    // res.json(findBlogId(blogId));
    res.json(foundBlog);
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

router.get("/postBlog", function (req, res, next) {
  res.render("postBlog");
});

router.post("/submit", async function (req, res, next) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const id = await collection.count();

    const newPost = {
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      createdAt: new Date(),
      lastModified: new Date(),
      category: req.body.category,
      id: Number(id + 1),
    };

    // res.status(201);
    // let newBlog = addBlogPost(req.body);
    // blogPosts.push(newBlog);
    // console.log(blogPosts);

    await collection.insertOne(newPost);
    res.send("Post has been submitted");
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

// Display Blogs Router
router.get("/displayBlogs", (req, res, next) => {
  res.render("displayBlogs");
});

// Display Single Blog Router
router.get("/displaySingleBlog", (req, res, next) => {
  res.render("displaySingleBlog");
});

// Delete Single Blog Router
// router.delete("/deleteblog/:blogId", (req, res, next) => {
//   const collection = await blogsDB().collection("blogs50");
//   const blogs50 = collection.deleteOne()
//   const blogToDelete = req.params.blogId;
//   for (let i = 0; i < blogsDB.length; i++) {
//     let blog = blogs50[i];
//     if (blog.id === blogToDelete) {
//       blogs50.splice(i, 1);
//     }
//   }
//   res.json("successfully deleted");
// });

router.put("/update-blog/:blogId", async function (req, res) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const blogId = Number(req.params.blogId) - 1;
    console.log(blogId);
    const blogs = await collection.find({}).toArray();
    const originalBlog = blogs[blogId];
    console.log(originalBlog);
    const updateBlog = req.body;

    const blogTitle = updateBlog.title ? updateBlog.title : originalBlog.title;
    const blogText = updateBlog.text ? updateBlog.text : originalBlog.text;
    const blogAuthor = updateBlog.author
      ? updateBlog.author
      : originalBlog.author;
    const blogCategory = updateBlog.category
      ? updateBlog.category
      : originalBlog.category;

    updateBlog = {
      lastModified: new Date(),
      title: blogTitle,
      text: blogText,
      author: blogAuthor,
      category: blogCategory,
      id: blogs.length + 1,
    };
    console.log(updateBlog);
    console.log(originalBlog._id);
    await Db.blogs50.updateOne({ id: originalBlog._id }, { $set: updateBlog });
    res.json("OK");
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

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
// let sortBlogs = (order) => {
//   if (order === "asc") {
//     return blogPosts.sort(function (a, b) {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     });
//   } else if (order === "desc") {
//     return blogPosts.sort(function (a, b) {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   } else {
//     return blogPosts;
//   }
// };

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
