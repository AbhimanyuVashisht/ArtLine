const router = require('express').Router();
const secrets = require('../secrets.json')
    , cartController = require('../schema/controller').cartController
    , orderInfoController = require('../schema/controller').orderInfoController;

let keyPublishable = 'pk_test_ltiSAJzRVAjed7OyjCeLJ9x8';
let keySecret = secrets.STRIPE_KEY_SECRET_TEST;


let stripe = require('stripe')(keySecret);

let storeLocal = {};

// Global Router to check weather the user is logged In or Not
router.use((req, res, next)=>{
    if(!req.user){
        res.redirect('/users');
    }else{
        next();
    }
});

router.post('/', async (req, res)=>{
    let userSession =  req.session.passport.user.member_id;
    if( userSession ){
        let cartItems = await cartController(userSession);
        let total = 0;
        for( let i of cartItems){
            total = total + i.dataValues.price
        }
        storeLocal.data = req.body;
        storeLocal.total = total * (100 - global.discount)/100;
        // console.log(total);
        res.render("checkout", {keyPublishable: keyPublishable, amount: total });
    }else{
        res.render("Login to pay");
    }

});

router.post('/charge', async (req, res)=>{
    let amount = await storeLocal.total;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer =>
        stripe.charges.create({
            amount,
            description: 'Sample Charge',
            currency: 'usd',
            customer: customer.id
        }))
        .then(async (charge) => {
        try{
            // console.log(charge)
            let info = {
                charge: charge,
                storeLocal: storeLocal,
                stripeBody: req.body,
                userID: req.session.passport.user.member_id,
                username: req.session.passport.user.username
            };
            let invoiceFilename = req.body.stripeToken + '_'+ info.userID + '.pdf';
            await orderInfoController(info);
            res.render("paymentdone", { invoice: invoiceFilename});
        }catch (err){
            console.log(err);
            res.send("Transaction failed");
        }
    });
});



module.exports = router;