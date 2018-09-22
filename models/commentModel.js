var mongoose = require("mongoose");

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
    }
})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;