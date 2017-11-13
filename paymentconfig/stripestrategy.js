const router = require('express').Router();
const secrets = require('../secrets.json')
    , cartController = require('../schema/controller').cartController
    , orderInfoController = require('../schema/controller').orderInfoController;

let keyPublishable = 'pk_test_ltiSAJzRVAjed7OyjCeLJ9x8';
let keySecret = secrets.STRIPE_KEY_SECRET_TEST;


let stripe = require('stripe')(keySecret);

let storeLocal = {};

// router.use((req, res, next)=>{
//     console.log(req.body);
//     next()
// })
router.post('/', async (req, res)=>{
    // console.log(req.body);
    // let userSession = req.session.passport.user.member_id
    let userSession =  '109484023739009832780';
    if( userSession ){
        let cartItems = await cartController(userSession);
        let total = 0;
        for( let i of cartItems){
            total = total + i.dataValues.price
        }
        storeLocal.data = req.body;
        storeLocal.total = total;
        // console.log(total);
        res.render("checkout", {keyPublishable: keyPublishable, amount: total });
    }else{
        res.render("Login to pay");
    }

});

router.post('/charge', async (req, res)=>{
    // console.log(req.body);
    // console.log(storeLocal);
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
                userID: '109484023739009832780' // need to add the user session
            };
            await orderInfoController(info);
            res.render("paymentdone");
        }catch (err){
            console.log(err);
            res.send("Transaction failed");
        }

    });
});



module.exports = router;