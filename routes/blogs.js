var express = require('express');
var router = express.Router();

var blogs = require("../public/javascripts/sampleBlogs")
const blogPosts = blogs.blogPosts

/* GET Blogs listing. */
router.get('/', function(req, res, next) {
  res.render('blogs', {title: 'Blogs'});
});

router.get('/all', function(req, res, next) {
  res.json(blogPosts);
});

router.get('/:id', (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  res.json(`${id}`);
})

module.exports = router;