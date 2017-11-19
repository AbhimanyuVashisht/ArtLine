let Blog = require('../blog.model');

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

methods.findAndUpdate = function (id, blogObj, cb) {
    Blog.findByIdAndUpdate(id, { $set: { title: blogObj.title, body: blogObj.body}}, { new: true}, (err, blog)=>{
        cb(err, blog);
    })
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


module.exports = methods;