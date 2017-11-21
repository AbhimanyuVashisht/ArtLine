let Blog = require('../blog.model');
let Votes = require('../vote.model');

let methods = {};

methods.insertBlog = function (blogObj, cb) {
    let newBlog = new Blog(blogObj);
    newBlog.save((err, newBlog)=>{
        cb(err, newBlog);
    });
};

methods.findByUser = function (user, cb) {
    Blog.find({'author': user}, (err, blog)=>{
        cb(err, blog)
    })
};

methods.findByBlog = function (id, cb) {
    Blog.find({_id: id}, (err, blog)=>{
        console.log(blog);
        cb(err, blog);
    })
};

methods.findAndUpdate = function (id, blogObj, cb) {
    Blog.findByIdAndUpdate(id, { $set: { title: blogObj.title, body: blogObj.body}}, { new: true}, (err, blog)=>{
        cb(err, blog);
    })
};

methods.findAndUpdateVotes = function (id, choice, cb) {
    // Increase in upvote
    if(choice === 1){
        Blog.update({_id: id}, { $inc: { "meta.upVotes": 1}}, (err, done)=>{
            if(err) throw err;
            console.log('Increaseing votes');
            methods.findByBlog(id, cb);
        })
    } else if(choice === 2){
        // Increase in downvote
        Blog.update({_id: id}, { $inc: { "meta.downVotes": -1}}, (err)=>{
            if(err) throw err;
            console.log('Decrementing votes')
            methods.findByBlog(id, cb);
        })
    } else if(choice === 3){
        // Increment in upVotes and Decrement in DownVotes
        Blog.update({_id: id}, { $inc: { "meta.upVotes": 1, "meta.downVotes": -1}}, (err)=>{
            if(err) throw err;
            console.log('Increase votes and decreasing votes')
            methods.findByBlog(id, cb);
        })
    } else if(choice === 4){
        // Decrement in upVotes and Decrement in DownVotes
        Blog.update({_id: id}, { $inc: { "meta.upVotes": -1, "meta.downVotes": 1}}, (err)=>{
            if(err) throw err;
            console.log('icrement in down and decrement in');
            methods.findByBlog(id, cb);
        })
    }
};

methods.remove = function (id) {
    Blog.remove({ _id: id}, (err)=>{
        if(!err){
            console.log('Done');
        }else{
            console.log(err);
        }
    })
};

methods.insertVote = function (voterID, blogID, vote,  cb) {
    let newVoter = new Votes({ voterId: voterID, blogId: blogID, vote: vote});
    newVoter.save((err, data)=>{
        cb(err, data);
    });
};

methods.upvote = function (voterID, blogID, cb) {
    Votes.findOne({voterId: voterID, blogId: blogID}, (err, doc)=>{
        if(err){
            console.log(err);
        }else{
            console.log(doc);
            if( doc === null){
                methods.insertVote(voterID, blogID, 1, (err, done)=>{
                    if(err) throw err;
                    console.log('inserting new');
                    methods.findAndUpdateVotes(blogID, 1, cb);
                });
            }
            else {
                if(doc.vote === 1){
                    console.log('No updates');
                    // console.log(blogID);
                    methods.findByBlog(blogID, cb);
                }else{
                    doc.vote = 1;
                    console.log('updates');
                    doc.save((err, upDoc)=>{
                        if(err) throw err;
                        methods.findAndUpdateVotes(blogID, 3, cb);
                    })
                }
            }
        }
    })
};

methods.downvote = function (voterID, blogID, cb) {
    Votes.findOne({voterId: voterID, blogId: blogID}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {

            if(doc === null){
                methods.insertVote(voterID, blogID, 0, (err, done)=>{
                    if(err) throw err;
                    methods.findAndUpdateVotes(blogID, 2, cb);
                });

            }
            else{
                if (doc.vote === 0) {
                    // cb(err, doc);
                    methods.findByBlog(blogID, cb);
                } else {
                    doc.vote = 0;
                    doc.save((err, downDoc) => {
                        if(err) throw err;
                        methods.findAndUpdateVotes(blogID, 4, cb);
                    })
                }
            }
        }
    })
};

module.exports = methods;