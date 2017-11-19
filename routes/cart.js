let router = require('express').Router();

let cartController = require('../schema/controller').cartController;

router.use('/', (req, res, next)=>{
    if (!req.user)
        res.redirect('/gallery');
    else
        next();
});

router.get('/', async (req, res)=>{
    let sessionUser = req.session.passport.user.member_id;
    try{
        let cartList = await cartController(sessionUser);
        res.render('cart', {cart: cartList});
    }catch (err){
        console.log(err);
    }
});

module.exports = router;

