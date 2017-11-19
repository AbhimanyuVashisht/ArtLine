
const express = require('express');
const bp = require('body-parser')
    , ejs = require('ejs')
    , path =require('path')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , mongoose = require('mongoose');

const controller = require('./schema/controller')
    , categoryController = controller.categoryController
    , productController = controller.productController
    , modalController = controller.modalController
    , addToCartController = controller.addToCartController
    , cartController = controller.cartController
    , removeFromCartController = controller.removeFromCartController;

let routes = require('./routes/index')
    , users = require('./routes/users')
    , auth = require('./routes/auth')
    , upload = require('./uploads/index')
    , profile = require('./routes/profile')
    , blogs = require('./routes/blogs');

let gateway = require('./paymentconfig/stripestrategy');

const app = express();
// view engine setup
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/projectx');

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', express.static(__dirname + '/public_static'));
app.use(session({
    secret: 'oauth',
    resave: true,
    saveUninitialized: true
}));

require('./config/passport')(app);

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

app.use('/gateway', gateway);
app.use('/application', upload);
app.use('/user', profile);
app.use('/blog', blogs);

// TODO: Manage routing

let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 };

app.get('/gallery', async (req, res)=>{
    console.log(req.query);
   let categoryList = await categoryController();
   let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 } || req.query;
   // filter.page = req.query.page;
   // filter.catID = req.query.q;
   let firstProductList = await productController(filter);

   res.render('gallery', {category: categoryList, products: firstProductList.rows, pages: ((firstProductList.count)/8+1)});
});

app.get('/products', async (req, res)=>{
    filter = req.query;
    console.log(filter);
    let productList = await productController(filter);
    console.log('Product Count'+productList.count);

    res.render('product', {products: productList.rows});
});

app.get('/modal', async (req, res)=>{
    console.log(req.query.prodID);
    let modalView = await modalController(req.query.prodID);
    res.render('modal', { product: modalView[0][0] });
});



app.post('/addToCart', async (req, res)=>{
    // TODO: add session  control here
    // let sessionUser = req.session.passport.user.member_id;
    let sessionUser = '109484023739009832780';
    try{
        await addToCartController(sessionUser, req.body.prodID);
        console.log('this one');
    }catch(err){
        console.log(err);
    }
});

app.get('/cart', async (req, res)=>{
    // TODO: add session  control here
     // let sessionUser = req.session.passport.user.member_id;
     try{
         let cartList = await cartController();
         // console.log(cartList)
         res.render('cart', {cart: cartList});
     }catch (err){
         console.log(err);
     }
});

app.get('/billing', (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/billing.html'));
});


app.post('/removeFromCart', async (req, res)=>{
    // console.log(req.body);
    // TODO: add session  control here
    let user = '109484023739009832780';
    try {
        await removeFromCartController(user, req.body.prodID);
        let cartList = await cartController();
        // console.log(cartList);
        res.render('cartDOM', {cart: cartList});
        // res.send({total: 50});

    }catch (err){
        console.log(err);
    }

});




app.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");        
});