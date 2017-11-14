let express = require('express')
    , router = express.Router()
    , fetchUserController = require('../schema/controller').fetchUserController;

/* GET users listing. */
router.use('/', function(req, res, next) {
  if (!req.user)
    res.redirect('/');
  else
    next();
});

router.get('/', async function(req, res) {
  // res.send('respond with a resource');
  console.log(req.user  , "this");
  let user = await fetchUserController(req.user.member_id);
  // console.log(user);
  res.render('user', { user: user }); // TODO: Can send req.user instead of user, sending this inorder to fetch follow-following
});
router.get('/logout',function(req,res){
        req.session.destroy(); //Destroy current session. this generate new session for next req.
        req.logout();
        res.redirect('/');
});

module.exports = router;