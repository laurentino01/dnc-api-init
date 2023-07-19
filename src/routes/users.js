var express = require("express");
const connectDB = require("../middlewares/connectDB");
var router = express.Router();

/* GET users listinsg. */
router.get("/", connectDB, function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
