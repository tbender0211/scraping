var express = require("express");
var router = express.Router();
var Scrape = require("../models/scrapeModel");

router.get("/", function(req, res) {
    Scrape.find(function(err, data) {
        res.render("index", {scrape: data});
    })
});

router.get("/saved", function(req, res) {
    res.render("saved");
});

module.exports = router;