let express = require('express')
    , router = express.Router()
    , sequelize = require('sequelize')
    , db = require('../schema/db');
/* GET users listing. */
router.use('/', function(req, res, next) {
  if (!req.user)
    res.redirect('/');
  else
    next();
});

router.get('/', function(req, res) {
  // res.send('respond with a resource');
  console.log(req.user  , "this");
  res.render('user', req.user);
});
router.get('/logout',function(req,res){
        req.session.destroy(); //Destroy current session. this generate new session for next req.
        req.logout();
        res.redirect('/');
});

module.exports = router;