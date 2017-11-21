let mongoose = require('mongoose');
let Schema = mongoose.Schema;




let voteSchema = new Schema({
    voterId: String,
    blogId: String,
    vote: Number
});

module.exports = mongoose.model('Votes', voteSchema);
