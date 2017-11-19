let express = require('express')
    , router = express.Router();
let controller = require('../schema/controller')
    , fetchUserController = controller.fetchUserController
    , fetchUserProductFeedController = controller.fetchUserProductFeed;
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