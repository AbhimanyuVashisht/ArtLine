let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/projectx', {
//     useMongoClient: true
// });

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

