//All the npm requirements
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var logger = require("morgan");

var PORT = process.env.PORT || 3000;
var app = express();

//The Mongoose stuff
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;


//Log request using morgan
app.use(logger("dev"));
//bodyparser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handlebars stuff
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//HTML routes
var routes = require("./routes/htmlRoutes");
app.use(routes);

//All the models
var Scrape = require("./models/scrapeModel");
var Comment = require("./models/commentModel");


db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
  });
  
// Log a Mongoose success message
db.once("open", function () {
    console.log("Mongoose connection was successful.");
  });


//Get routes
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/scrape", function(req, res) {

    request("https://www.npr.org/series/tiny-desk-concerts/", function(error, response, html) {

        var $ = cheerio.load(html);

        $(".info").each(function(i, element) {

            var data = {};

            data.title = $(element).find(".title").children("a").text();
            data.link = $(element).find(".title").children("a").attr("href");
            data.summary = $(element).children("p.teaser").text();

            new Scrape(data).save(function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });
        });
        res.send("Scrape Complete");
        res.render("index");
    });  
});

app.get("/sessions", function (req,res) {
    Scrape.find({}).limit(15).exec(function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

app.get("/saved", function (req, res) {
    Scrape.find({"saved": true}).populate("saved").exec(function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.render("saved");
        }
    })
});

//Post routes
app.post("/scrapes/save/:id", function (req, res) {
    // Find and update the articles boolean by ID
    Scrape.findOneAndUpdate({ _id: req.params.id }, { saved: true })
      // Execute the query
      .exec(function (err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
          console.log(doc);
        }
      });
  });

app.post("/scrapes/unsave/:id", function (req, res) {

    Scrape.findOneAndUpdate({_id: req.params.id}, {saved: false})
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(doc);
                console.log(doc);
            }
    });
});

app.post("/clear", function (req,res) {
    Scrape.find({}).remove()
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                res.render("index");
            }
        })
})


//Start the app locally
app.listen(PORT, function() {
    console.log("App running on port " + PORT + ".");
});