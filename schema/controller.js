const db = require('./db')
    , sequelize = require('sequelize');

async function categoryController(){

    let categoryList = await db.Category.findAll({
        attributes: ['cat_id', 'category_name', 'category_image']
    });
    return categoryList;
}

async function featuredController() {
    let featured = await db.Products.findAll({
        attributes: ['prod_id', 'product_name', 'product_path'],
        order: [
            ['views', 'DESC']
        ],
        limit: 3
    });
    console.log(featured);
    return featured
}

module.exports = {
    categoryController,
    featuredController
};