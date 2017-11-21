let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/projectx', {
//     useMongoClient: true
// });


let voteSchema = new Schema({
    voterId: String,
    blogId: String,
    vote: Number
});

module.exports = mongoose.model('Votes', voteSchema);
