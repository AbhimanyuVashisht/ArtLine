let router = require('express').Router();
// fetchinf mongo Database
let db = require('../schema/models/config/database');


let controller = require('../schema/controller')
    , fetchUserController = controller.fetchUserController
    , followController = controller.followController
    , fetchUserProductFeedController = controller.fetchUserProductFeed;


router.get('/:id', async (req, res)=>{
    let user = await fetchUserController(req.params.id);
    let userProductFeed = await fetchUserProductFeedController(req.params.id);
    // TODO: user profile problem
    db.findByUser( req.params.id, (err, blog)=>{
       if(err) throw err;
       res.render('profile', { user: user, product: userProductFeed, blog: blog });
    });
});

router.post('/follow', (req, res)=>{
    console.log(req.body);
    // TODO: add session control here
    let userSession = '105864670115367217760';
    // let userSession = req.session.passport.user.member_id ;
    if( userSession ){
        console.log(true);
        followController(userSession, req.body.followID);
    }else{
        console.log(false);
    }
});

module.exports = router;