const router = require('express').Router();
const secrets = require('../secrets.json');

let keyPublishable = 'pk_test_ltiSAJzRVAjed7OyjCeLJ9x8';
let keySecret = secrets.STRIPE_KEY_SECRET_TEST;


let stripe = require('stripe')(keySecret);

router.post('/', (req, res)=>{
    // console.log(req);
    res.render("checkout", {keyPublishable: keyPublishable});
});

router.post('/charge', (req, res)=>{
    let amount = 100;

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
        .then(charge => res.render("paymentdone.ejs"));
});



module.exports = router;