
const express = require('express');
const path = require('path');
const bp = require('body-parser')
    , ejs = require('ejs')
    , cookieParser = require('cookie-parser')
    , session = require('express-session');

const controller = require('./schema/controller')
    , categoryController = controller.categoryController
    , featuredController = controller.featuredController
    , productController = controller.productController
    , modalController = controller.modalController
    , addToCartController = controller.addToCartController
    , cartController = controller.cartController;

let routes = require('./routes/index')
    , users = require('./routes/users')
    , auth = require('./routes/auth');

let gateway = require('./paymentconfig/stripestrategy');

const app = express();
// view engine setup
app.set('view engine', 'ejs');

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




app.get('/', async (req, res)=>{
    // console.log('inside index');

    let categoryList = await categoryController();
    let featuredList = await featuredController();
    res.render('index', {category: categoryList, featured: featuredList});
});
let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 };

app.get('/gallery', async (req, res)=>{
    console.log('inside gallery');
   let categoryList = await categoryController();
   let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 } || req.query;
   let firstProductList = await productController(filter);

   res.render('gallery', {category: categoryList, products: firstProductList});

});

app.get('/products', async (req, res)=>{
    filter = req.query;
    let productList = await productController(filter);

    res.render('product', {products: productList});
    // res.end();
});

app.get('/modal', async (req, res)=>{
    console.log(req.query.prodID);
    let modalView = await modalController(req.query.prodID);
    res.render('modal', {product: modalView});
});

app.post('/addToCart', async (req, res)=>{
    let sessionUser = req.session.passport.user.member_id;
    try{
        let done = await addToCartController(sessionUser, req.body.prodID);
        console.log(done);
    }catch(err){
        console.log(err);
    }
});

app.get('/cart', async (req, res)=>{
     // let sessionUser = req.session.passport.user.member_id;
     try{
         let cartList = await cartController();
         res.render('cart', {cart: cartList});
     }catch (err){
         console.log(err);
     }
});

app.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");        
});