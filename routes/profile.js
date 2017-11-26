let router = require('express').Router();
// fetching mongo Database
let db = require('../schema/models/config/database');
let hireMailController = require('../sendgrid/controller').hireMailController;


let controller = require('../schema/controller')
    , fetchUserController = controller.fetchUserController
    , followController = controller.followController
    , fetchUserProductFeedController = controller.fetchUserProductFeed;


router.get('/:id', async (req, res)=>{
    try {
        if( req.params.id === req.session.passport.user.member_id){
            res.redirect('/');
        }else {
            let user = await fetchUserController(req.params.id);
            let userProductFeed = await fetchUserProductFeedController(req.params.id);
            db.findByUser(req.params.id, (err, blog) => {
                if (err) throw err;
                res.render('profile', {user: user, product: userProductFeed, blog: blog});
            });
        }
    }catch(err){

        let user = await fetchUserController(req.params.id);
        let userProductFeed = await fetchUserProductFeedController(req.params.id);
        db.findByUser(req.params.id, (err, blog) => {
            if (err) throw err;
            res.render('profile', {user: user, product: userProductFeed, blog: blog});
        });
    }

});

// router.use('/', (req, res, next)=>{
//     if (!req.user)
//         res.redirect('/'); // TODO: login Page
//     else
//         next();
// });

router.use((req, res, next)=>{
   if(!req.user){
       res.send('47'); // Status to say that you are not login
   } else{
       next();
   }
});

router.post('/follow', (req, res)=>{
    let userSession = req.session.passport.user.member_id;
    if( userSession ){
        console.log(true);
        followController(userSession, req.body.followID);
        res.send('200');
    }else{
        console.log(false);
        res.send('47');
    }
});

router.post('/hire', (req, res)=>{
    console.log(req.body);
    console.log(req.user);
   hireMailController({userHired: req.body.userEmail, userHiring: req.user.username, userHiringEmail: req.user.email});
   res.sendStatus(200);

});
module.exports = router;