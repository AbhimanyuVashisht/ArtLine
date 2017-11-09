const db = require('./db')
    , sequelize = require('sequelize');

async function categoryController(){

    return await db.Category.findAll({
        attributes: ['cat_id', 'category_name', 'category_image']
    });
}

async function featuredController() {
    return await db.Products.findAll({
        attributes: ['prod_id', 'product_name', 'product_path'],
        order: [
            ['views', 'DESC']
        ],
        limit: 3
    });
}

async function productController(filter) {
    let orderFilter = await chooseOrderFilter(filter.sort);
    let offset = ( filter.page - 1 ) * 8;
    return await db.Products.findAll({
        where: {
            $and: {
                fk_category_id: filter.catID,
                'price': {
                    $gte: filter.lbp,
                    $lte: filter.ubp,
                }
            }
        },
        order: [[orderFilter.tuple, orderFilter.order]],
        offset: offset,
        limit: 8
    })

}

async function chooseOrderFilter(sortValue) {

    let filter = { tuple: 'prod_id', order: 'ASC'};
    if(sortValue == 0){
        // Default Sort
        return filter;
    }else if(sortValue == 1){
        // Sort by popularity
        filter.tuple = 'views';
        filter.order = 'DESC';
        return filter;
    }else if(sortValue == 2){
        // Sort by Average Rating
        filter.tuple = 'rating';
        filter.order = 'DESC';
        return filter;
    }else if(sortValue == 3){
        // Sort by Newness
        filter.tuple = 'updatedAt';
        filter.order = 'DESC';
        return filter;
    }else if(sortValue == 4){
        // Sort by Price LOW to HIGH
        filter.tuple = 'price';
        return filter;
    }else if(sortValue == 5){
        // Sort by Price HIGH to LOW
        filter.tuple = 'price';
        filter.order = 'DESC';
        return filter;
    }
}

async function modalController(pid) {

    // incrementing views with each ProductView
    db.Products.findById(pid).then((prod)=>{
        prod.increment('views', {by: 1})
    });

    return await db.Products.findOne({
        where: {
            prod_id: pid
        }
    })
}

async function addToCartController(user, pid) {
    console.log(user);
    if( typeof user !== 'undefined' ){
        console.log('yea');
        try{
            await db.Cart.create({fk_member_id: user, fk_prod_id: pid});

            return 'Done';
        } catch (err){
            console.log(err);
            return 'Already Added';
        }
    }else{
        return 'Login to Add'
    }

}
module.exports = {
    categoryController,
    featuredController,
    productController,
    modalController,
    addToCartController
};