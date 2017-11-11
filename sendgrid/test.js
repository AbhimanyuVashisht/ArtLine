
const secrets = require('../secrets.json');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(secrets.SENDGRID_API_KEY);
const msg = {
    to: 'rockysingh.av@gmail.com',
    from: 'abhimanyuvashisht.av@gmailcom',
    subject: 'Welcome Mail from Artist Hub',
    text: 'Thanks for registering yourself with us\n-Team Artist Hub',
    html: '<strong>Thanks for registering yourself with us<br>-Team Artist Hub</strong>',
    // attachment: {
    //     type: 'pdf',
    //     filename: 'file.pdf'
    // }
};
sgMail.send(msg);