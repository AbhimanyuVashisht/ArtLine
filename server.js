
const express = require('express');
const path = require('path');
const bp = require('body-parser')
    , ejs = require('ejs');
const controller = require('./schema/controller');
const categoryController = controller.categoryController
    , featuredController = controller.featuredController;
const app = express();

app.use('/', express.static(__dirname + '/public_static'));

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{

    let categoryList = await categoryController();
    let featuredList = await featuredController();
    res.render('index', {category: categoryList, featured: featuredList});
});

// app.get('/')


app.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");        
});