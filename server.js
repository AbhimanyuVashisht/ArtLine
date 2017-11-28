
const express = require('express');
const bp = require('body-parser')
    , ejs = require('ejs')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , mongoose = require('mongoose')
    , path = require('path');

const controller = require('./schema/controller')
    , categoryController = controller.categoryController
    , productController = controller.productController
    , modalController = controller.modalController
    , countCartProductController = controller.countCartItemController;

let routes = require('./routes/index')
    , users = require('./routes/users')
    , auth = require('./routes/auth')
    , upload = require('./uploads/index')
    , profile = require('./routes/profile')
    , blogs = require('./routes/blogs')
    , cart = require('./routes/cart');

let gateway = require('./paymentconfig/stripestrategy');

const app = express();

// view engine setup
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/projectx', {
    useMongoClient: true
});


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
app.use('/cart', cart);


global.discount = 0;

setInterval(require('./config/calDiscount'), 86400000 );


let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 };


app.get('/gallery', async (req, res)=>{
    let categoryList = await categoryController();
   let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 } || req.query;
   let firstProductList = await productController(filter);
   if(req.user){
       let cartCount = await countCartProductController(req.session.passport.user.member_id);
       res.render('gallery', {category: categoryList, products: firstProductList.rows, pages: (Math.floor((firstProductList.count)/8)+1), cartCount: cartCount});
   }else{
       res.render('gallery', {category: categoryList, products: firstProductList.rows, pages: (Math.floor((firstProductList.count)/8)+1), cartCount: 0});
   }
});


app.get('/products', async (req, res)=>{
    filter = req.query;
    console.log(filter);
    let productList = await productController(filter);
    console.log('Product Count '+productList.count);

    if( filter.catID == 2 || filter.catID == 3 || filter.catID == 5 || filter.catID == 6 ){ //Reserving Few categories to the video section
        res.render('productYT', {product: productList.rows});
    }else{
        res.render('product', {products: productList.rows});
    }

});

app.get('/modal', async (req, res)=>{
    let modalView = await modalController(req.query.prodID);
    let modalContent = modalView[0][0];
    if(modalContent.fk_category_id == 2 || modalContent.fk_category_id == 3 || modalContent.fk_category_id == 5 || modalContent.fk_category_id == 6){
        res.render('modalYT', {product: modalContent});
    }else{
        res.render('modal', { product: modalView[0][0], discount: global.discount });
    }
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");        
});