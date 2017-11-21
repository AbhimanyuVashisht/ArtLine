let express = require('express')
    , router = express.Router();
let controller = require('../schema/controller')
    , fetchUserController = controller.fetchUserController
    , fetchUserProductFeedController = controller.fetchUserProductFeed
    , userProfileFeedController = controller.userProfileFeedController
    , userProductFeedController = controller.userProductController;

let db = require('../schema/models/config/database');


/* GET users listing. */
router.use('/', function(req, res, next) {
  if (!req.user)
    res.redirect('/');
  else
    next();
});

router.get('/', async function(req, res) {
  console.log(req.user  , "this");
  let user = await fetchUserController(req.user.member_id);
  let userProductFeed = await fetchUserProductFeedController(req.user.member_id);
  let userProfileFeed = await userProfileFeedController();
  // console.log(userProfileFeed);
  let followingsList = [];
  for( let i of userProfileFeed){
      followingsList.push(i.fk_following_id);
  }
  console.log(followingsList);
  // let userProductFollowerFeed = await userProductFeedController(userProfileFeed);
  // console.log(userProductFollowerFeed);
    // TODO: Integrate with the front end ones the front end is ready
    // Fetching the user followed
    db.findFollowedUser(followingsList, (err, list)=>{
        if(err) throw err;
        console.log(list);
    });
  db.findByUser( req.user.member_id, (err, blog)=>{
      if(err) throw err;
      res.render('user', { user: user, product: userProductFeed, blog: blog });
  });

});


router.get('/logout',function(req,res){
        req.session.destroy(); //Destroy current session. this generate new session for next req.
        req.logout();
        res.redirect('/');
});

module.exports = router;