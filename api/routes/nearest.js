var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

var obj;

fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY')
  .then(response => response.json())
  .then(data => {
    obj = data
})

router.get("/", (req, res, next) => {
    res.send(obj);
})

module.exports = router;


