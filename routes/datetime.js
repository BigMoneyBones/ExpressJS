var express = require('express');
var router = express.Router();
var date = new Date();

/* GET home page */
router.get('/', function (req, res, next) {
    res.send(date.toString());
});

module.exports = router;