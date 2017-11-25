let router = require('express').Router();
let path = require('path');

let controller = require('../schema/controller')
    , cartController = controller.cartController
    , addToCartController = controller.addToCartController
    , removeFromCartController = controller.removeFromCartController
    , countCartItemController = controller.countCartItemController;

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

router.get('/billing', (req, res)=>{
    res.sendFile(path.join(__dirname + '/../views/billing.html'));
});



router.get('/removeFromCart', async (req, res)=>{
    console.log(req.query.prodID);
    let userSession = req.session.passport.user.member_id;
    try {
        await removeFromCartController(userSession, req.query.prodID);
        // let cartList = await cartController();
        // console.log(cartList);
        // res.render('cartDOM', {cart: cartList});
        res.redirect('/cart');
    }catch (err){
        console.log(err);
    }

});

router.post('/addToCart', async (req, res)=>{
    let sessionUser = req.session.passport.user.member_id;
    try{
        let status = await addToCartController(sessionUser, req.body.prodID);
        console.log(status);
        if(status){
            let cartCount = await countCartItemController(sessionUser);
            res.send({status: '200', cartCount: cartCount});
        }else{
            res.send({status: '302'});
        }
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

