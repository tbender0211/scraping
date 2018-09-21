var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var PORT = 3000;
var app = express();

app.use(express.static("public"));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/htmlRoutes");

app.use(routes);

mongoose.connect("mongodb://localhost/scraping", {useNewUrlParser: true});

app.post("/", function(req, res) {

    request("https://www.npr.org/series/tiny-desk-concerts/", function(error, response, html) {

        var $ = cheerio.load(html);

        $(".info").each(function(i, element) {

            var title = $(element).find(".title").children("a").text();
            var link = $(element).find(".title").children("a").attr("href");
            var summary = $(element).children(".teaser").text();

            if (title && link) {

                var data = {
                    title: title,
                    link: link,
                    summary: summary
                };

                Scrape.create(data)
                    .then(function(scrapedData){
                        console.log(scrapedData);
                    })
                    .catch(function(err) {
                        console.log(err.message);
                    });
            }
        });
    });  
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + ".");
});