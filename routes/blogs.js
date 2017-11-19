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
        title: 'Title',
        author: 'Id of the user',
        body: 'body',
        meta: {
            upVotes: 1,
            downVotes: 2
        }
    };
    db.insertBlog(blogObj, (err, blog)=>{
        if(err) throw err;
        res.send(blog);
    })
});

// TODO: update router
// router.post('/update', (req, res)=>{
//     db.findAndUpdate()
// })

// TODO: delete router
router.post('/delete', (req, res)=>{
    db.remove(req.body.id);
});



module.exports = router;