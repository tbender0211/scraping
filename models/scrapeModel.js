var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
});

var Scrape = mongoose.model("Scrape", schema);

module.exports = Scrape;