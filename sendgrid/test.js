
const secrets = require('../secrets.json');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(secrets.SENDGRID_API_KEY);
// const msg = {
//     to: 'rockysingh.av@gmail.com',
//     from: 'abhimanyuvashisht.av@gmailcom',
//     subject: 'Welcome Mail from Artist Hub',
//     text: 'Thanks for registering yourself with us\n-Team Artist Hub',
//     html: '<strong>Thanks for registering yourself with us<br>-Team Artist Hub</strong>',
//     files[someOrderID]= someOrderID.pdf
// };

const msg = {
    "personalizations": [
        {
            "to": [
                {
                    "email": "rockysing.av@gmail.com"
                }
            ],
            "subject": "Trying V3 API endpoint"
        }
    ],
    "from": {
        "email": "arjunchauhan24@gmail.com"
    },
    "content": [
        {
            "type": "text/plain",
            "value": "Helllo, World"
        }
    ],
    "sandbox_mode": {
        "enable": false
    },
    "attachments": [
        {
            "content": "[BASE64 encoded content block here]",
            "type": "pdf",
            "filename": "someOrderID.pdf",
        }
    ]
};
sgMail.send(msg);