
const secrets = require('../secrets.json');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(secrets.SENDGRID_API_KEY);

function welcomeMailController(userEmail) {
    const msg = {
        to: userEmail,
        from: 'abhimanyuvashisht.av@gmail.com',
        subject: 'Welcome Mail from Artist Hub',
        text: 'Thanks for registering yourself with us\n-Team ArtLine',
        html: '<strong>Thanks for registering yourself with us<br>-Team ArtLine</strong>',
    };
    sgMail.send(msg);
}


function orderMailController(orderMailObj) {
    const msg = {
        to: orderMailObj.userEmail,
        from: 'abhimanyuvashisht.av@gmail.com',
        subject: 'Order Placed for OrderID: ' + orderMailObj.orderID,
        text: 'Thanks for choosing Artist-Hub. \n Your Order is confirmed with OrderID: '+ orderMailObj.orderID+'\n-Team ArtLine',
        html: '<strong>Thanks for choosing Artist-Hub. <br> Your Order is confirmed <br>You can download the invoice from here : <a href="/generatedInvoice/">Invoice</a><br>-Team ArtLine</strong>',
    };
    sgMail.send(msg)
}

function uploadMailController(uploadMailObj) {
    const msg = {
        to: uploadMailObj.email,
        from: 'abhimanyuvashisht.av@gmail.com',
        subject: 'Application submitted with UploadID: ' + uploadMailObj.uploadID,
        text: 'Thanks for submitting your application. \n Your application is under process',
        html: '<strong>Thanks for submitting your application. <br> Your application is under process <br>- Team ArtLine</strong>'
    };
    sgMail.send(msg)
}

function hireMailController(hireMailObj) {
    const msg = {
        to: hireMailObj.userHired,
        from: 'abhimanyuvashisht.av@gmai.com',
        subject: 'You are hired by ' + hireMailObj.userHiring + ', Email ' + hireMailObj.userHiringEmail,
        text: 'You are hired by ' + hireMailObj.userHired,
        html: '<strong> You are hired on ArtLine</strong>- Team ArtLine'

    };
    sgMail.send(msg);
}

module.exports = {
    welcomeMailController,
    orderMailController,
    uploadMailController,
    hireMailController
};

