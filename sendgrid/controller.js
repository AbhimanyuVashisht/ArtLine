
const secrets = require('../secrets.json');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(secrets.SENDGRID_API_KEY);

function welcomeMailController(userEmail) {
    const msg = {
        to: userEmail,
        from: 'abhimanyuvashisht.av@gmail.com',
        subject: 'Welcome Mail from Artist Hub',
        text: 'Thanks for registering yourself with us\n-Team Artist Hub',
        html: '<strong>Thanks for registering yourself with us<br>-Team Artist Hub</strong>',
    };
    sgMail.send(msg);
}


module.exports = {
    welcomeMailController
};

