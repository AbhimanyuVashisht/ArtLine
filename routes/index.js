let express = require('express')
    , router = express.Router();

const controller = require('../schema/controller')
    , categoryController = controller.categoryController
    , featuredController = controller.featuredController;

/* GET home page. */

router.get('/', async function(req, res) {
   if(req.isAuthenticated()){
    res.redirect('/users');
  }
  else{
       let categoryList = await categoryController();
       let featuredList = await featuredController();
       res.render('index', {category: categoryList, featured: featuredList});
  }
});

module.exports = router;
