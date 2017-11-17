
// To Create the Purchase Invoice after the purchase of the item
const PDFDocument = require('pdfkit')
    , fs = require('fs');

let date = new Date();

async function createInvoice(invoiceObj) {

    let doc = new PDFDocument;
    let orderId = invoiceObj.order.stripeBody.stripeToken + '_' + invoiceObj.order.userID;
    doc.pipe(fs.createWriteStream( 'invoice/generatedInvoice/'+ orderId +'.pdf'));
    // doc.pipe(res);
    doc.fontSize(30)
        .text('Artist-Hub', {
            align: 'center'
        })
        .fontSize(25)
        .text('Invoice',{
            align: 'center'
        });

    doc.lineWidth(1);
    doc.lineCap('butt')
        .moveTo(600, 140)
        .lineTo(10, 140)
        .stroke();

    doc.moveDown();

    let purchasedBy = invoiceObj.order.username;
    let email = invoiceObj.order.stripeBody.stripeEmail;
    let phoneNumber = invoiceObj.order.storeLocal.data.tell;
    let paymentMode = invoiceObj.order.stripeBody.stripeTokenType;
    let billingAddress = invoiceObj.order.storeLocal.data.address;
    let shippingAddress = invoiceObj.order.storeLocal.data.address;
    doc.font('Times-Roman', 13)
        .text('Date Time of purchase: '+ date)
        .moveDown()
        .text(purchasedBy)
        .moveDown()
        .text('Email: ' + email)
        .moveDown()
        .text('Phone Number: ' + phoneNumber)
        .moveDown()
        .text('Billing Address: ' + billingAddress)
        .moveDown()
        .text('Shipping Address: ' + shippingAddress)
        .moveDown()
        .text('Payment Mode: ' + paymentMode);
    doc.moveDown();
    doc.lineCap('butt')
        .moveTo(600, 360)
        .lineTo(10, 360)
        .stroke();


    let rowHeader = 'Item                                                                                                                             Price';
    doc.text(rowHeader,{
        align: 'justify'
    });

    let purchaseList = invoiceObj.purchase;
    // let totalPayed = 0;
    for( let i of purchaseList){
        doc.moveDown()
            .fontSize(10)
            .text(i.prod_id + '                                                       ' +
                '          ' + i.product_name + '                                                                                       ' + i.price );

    }

    doc.moveDown()
        .fontSize(13)
        .text('Total                                       ' +
            '                                                                              : ' + invoiceObj.order.storeLocal.total);
    doc.end();
}

module.exports = createInvoice;