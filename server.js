
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
    , cartController = controller.cartController
    , fetchUserController = controller.fetchUserController
    , followController = controller.followController
    , removeFromCartController = controller.removeFromCartController;

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
// app.use('/', routes);
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

app.get('/gallery/:page?', async (req, res)=>{
    console.log('inside gallery');
   let categoryList = await categoryController();
   let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 } || req.query;
   // filter.page = req.query.page;
   let firstProductList = await productController(filter);

   res.render('gallery', {category: categoryList, products: firstProductList.rows, pages: ((firstProductList.count)/8+1)});
});

app.get('/products', async (req, res)=>{
    filter = req.query;
    console.log(filter);
    let productList = await productController(filter);
    console.log('Product Count'+productList.count);

    res.render('product', {products: productList.rows});
    // res.end();
});

app.get('/modal', async (req, res)=>{
    console.log(req.query.prodID);
    let modalView = await modalController(req.query.prodID);
    // console.log(modalView[0][0]);
    // console.log(modalView.users[0].member_id);
    res.render('modal', { product: modalView[0][0] });
});



app.post('/addToCart', async (req, res)=>{
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
    res.render('billing');
});

app.get('/user/:id', async (req, res)=>{

    // console.log(req.params.id);
    let user = await fetchUserController(req.params.id);
    // console.log(user);
    res.render('profile', {user: user});
    // res.end();
});

app.post('/follow', (req, res)=>{
    console.log(req.body);
    // add session control here
    let userSession = 105864670115367217760;
    // let userSession = req.session.passport.user.member_id ;
    if( userSession ){
        console.log(true);
        followController(userSession, req.body.followID);

    }else{
        console.log(false);
    }
    // res.end()
});

app.post('/removeFromCart', async (req, res)=>{
    // console.log(req.body);
    user = 109484023739009832780;
    try {
        await removeFromCartController(user, req.body.prodID);
        let cartList = await cartController();
        // console.log(cartList);
        res.render('cartDOM', {cart: cartList});
        // res.send({total: 50});

    }catch (err){
        console.log(err);
    }

})

app.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");        
});