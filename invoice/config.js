const PDFDocument = require('pdfkit')
    , fs = require('fs');

let doc = new PDFDocument;

let orderId = 'someOrderID';
doc.pipe(fs.createWriteStream( orderId +'.pdf'));
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

let purchasedBy = 'Abhimanyu Vashisht';
let email = 'xyz@abcd.com';
let phoneNumber = '99999999';
let paymentMode = 'ONLINE';
let billingAddress = 'R-6/174 Rajnagar Ghazibad';
let shippingAddress = 'R-6/174 Rajnagar Ghazibad';
let dataOfPurchase = 'DD-MM-YYYY HH:MM:SS';
doc.font('Times-Roman', 13)
    .text('Date Time of purchase: '+ dataOfPurchase)
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

let purchaseList = [ { productId: '01', productName: 'Product01', productPrize: '010' }
, { productId: '02', productName: 'Product02', productPrize: '020' }];
let totalPayed = 0;
for( let i of purchaseList){
    doc.moveDown()
        .fontSize(10)
        .text(i.productId + '                                                       ' +
            '          ' + i.productName + '                                                                                       ' + i.productPrize );

        totalPayed = totalPayed +  i.productPrize;


}

doc.moveDown()
    .fontSize(13)
    .text('Total                                       ' +
        '                                                                              : ' + totalPayed);
doc.end();
