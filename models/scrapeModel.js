var mongoose = require("mongoose");
var Comment = require("./commentModel")

var Schema = mongoose.Schema;

var scrapeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Scrape = mongoose.model("Scrape", scrapeSchema);

module.exports = Scrape;