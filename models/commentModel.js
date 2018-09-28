var mongoose = require("mongoose");
var Scrape = require("./scrapeModel");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    scrape: {
        type: Schema.Types.ObjectId,
        ref: "Scrape"
    }
})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;