let router = require('express').Router();

let controller = require('../schema/controller')
    , fetchUserController = controller.fetchUserController
    , followController = controller.followController;


router.get('/:id', async (req, res)=>{
    let user = await fetchUserController(req.params.id);
    res.render('profile', {user: user});
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