let router = require('express').Router();
let db = require('../schema/models/config/database');


/* Get to the index router*/
router.get('/', (req, res)=>{
   db.findByUser('Id of the user', (err, blog)=>{
       if(err) throw err;

       res.send(blog);
   })
});

router.post('/insert', (req, res)=>{
    let blogObj = {
        title: req.body.title,
        author: req.session.passport.user.member_id,
        body: req.body.body,
        meta: {
            upVotes: 0,
            downVotes: 0
        }
    };
    db.insertBlog(blogObj, (err, blog)=>{
        if(err) throw err;
        res.redirect('/users');
    })
});

// TODO: update router
// router.post('/update', (req, res)=>{
//     db.findAndUpdate()
// })


router.post('/delete', (req, res)=>{
    db.remove(req.body.id, req.user.member_id,(err, blogList)=>{
        // res.render('userBlogList', {blog: blogList})
        // res.redirect('/users');
        res.sendStatus(200);
    });
});

router.use((req, res, next)=> {
    if (!req.user) {
        res.send('786');
    } else {
        next();
    }
});

router.post('/upvote', (req, res)=>{
    let voterID = req.session.passport.user.member_id;
    let blogID = req.body.blogID;
    db.upvote(voterID, blogID, (err, doc)=>{
        if(err) throw err;
        console.log('This is the doc in post' + doc);
        res.send(doc[0].meta);
    })
});


router.post('/downvote', (req, res)=>{
    let voterID = req.session.passport.user.member_id;
    let blogID = req.body.blogID;
    db.downvote(voterID, blogID, (err, doc)=>{
        if(err) throw err;
        console.log('This is the doc in downvote' + doc)
        res.send(doc[0].meta);
    })
});



module.exports = router;