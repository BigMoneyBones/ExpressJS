var express = require("express");
var router = express.Router();

/* GET users listing. */

// Stretch Goal ***
router.get("/", function (req, res, next) {
  res.render("users", { title: "Users" });
});
// End Of Stretch Goal ***

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/myname", (req, res, next) => {
  res.send("Jesse Raines");
});

router.get("/myfavoritemovies", (req, res, next) => {
  res.json(["The Lion King", "The Land Before Time", "Ferngulley"]);
});

module.exports = router;
