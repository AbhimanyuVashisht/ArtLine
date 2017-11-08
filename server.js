
const express = require('express');
const path = require('path');
const bp = require('body-parser')
    , ejs = require('ejs');
const controller = require('./schema/controller');
const categoryController = controller.categoryController
    , featuredController = controller.featuredController
    , productController = controller.productController;
const app = express();

app.use('/', express.static(__dirname + '/public_static'));

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{
    console.log('inside index');

    let categoryList = await categoryController();
    let featuredList = await featuredController();
    res.render('index', {category: categoryList, featured: featuredList});
});
let filter = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 };

app.get('/gallery', async (req, res)=>{
    console.log('inside gallery');
   let categoryList = await categoryController();

   let firstProductList = await productController(filter);

   res.render('gallery', {category: categoryList, products: firstProductList});

});

app.get('/products', async (req, res)=>{
    let categoryList = await categoryController();
    filter.catID = req.query.cat_id;
    let productList = await productController(filter);

    res.render('gallery', {category: categoryList, products: productList})

});


app.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");        
});