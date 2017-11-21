let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        upVotes: Number,
        downVotes: Number
    },
});


module.exports = mongoose.model('Blog', blogSchema);

