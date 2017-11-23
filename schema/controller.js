const db = require('./db')
    , invoice = require('../invoice/config')
    , orderMailController = require('../sendgrid/controller').orderMailController;

async function categoryController(){

    return await db.Category.findAll({
        attributes: ['cat_id', 'category_name', 'category_image']
    });
}

async function featuredController() {
    return await db.Products.findAll({
        attributes: ['prod_id', 'product_name', 'description', 'product_path'],
        order: [
            ['views', 'DESC']
        ],
        limit: 3
    });
}

async function productController(filter) {
    let orderFilter = await chooseOrderFilter(filter.sort);
    let offset = ( filter.page - 1 ) * 8;
    return await db.Products.findAndCountAll({
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

    return await db.db.query("SELECT * FROM users, products WHERE products.prod_id = '"+ pid + "' AND users.member_id = products.fk_member_id;");
}

async function addToCartController(user, pid) {
    console.log(user);
    try {
        console.log('yea');
        let searchInCart = await db.Cart.findOne({
            where: {
                $and: {
                    fk_member_id: user,
                    fk_prod_id: pid
                }
            }
        });

        if(searchInCart){
            return 0; //status code for already added
        }else{
            console.log('hey here');
            await db.Cart.create({fk_member_id: user, fk_prod_id: pid});
            return 1; //status code for item added
        }

    }catch (err){
        throw err;
    }
}

async function removeFromCartController(user, pid) {
    if( user ){
        try {
            return await db.Cart.destroy({
                where:{
                    fk_member_id: user,
                    fk_prod_id: pid
                }
            })
        }catch (err){
            console.log(err);
        }
    }else{
        console.log('Login To Remove')
    }
}

async function countCartItemController(user) {
    try {
        return await db.Cart.count({where: { fk_member_id: user}});
    }catch (err){
        throw err;
    }
}

async function cartController(userID) {
    try{
        let joinList = await db.User.findAll({
                include: [{
                    model: db.Products,
                    through: {
                        where: { fk_member_id: userID }
                    }
                }]
            });
        for( let i in joinList){
            if( joinList[i].dataValues.member_id === userID ){
                return joinList[i].dataValues.products;
            }
        }

    }catch (err){
        throw err;
    }
}

function followController(userSession, followingID) {
        db.Follow.findOne({
            where: {
                $and: {
                    fk_follower_id: userSession,
                    fk_following_id: followingID
                }
            }
        }).then((done)=>{
            if(done){
                db.Follow.destroy({
                    where:{
                        $and:{
                            fk_follower_id: userSession,
                            fk_following_id: followingID
                        }
                    }
                });
                console.log('Unfollowing');
            }else{
                db.Follow.create({
                    fk_follower_id: userSession,
                    fk_following_id: followingID
                }).then(()=>{
                    console.log('Following');
                }).catch((err)=>{
                    throw err;
                })
            }
        }).catch((err)=>{
            throw err;
        })
}


async function fetchUserController(userID) {
    try {
        let user = await db.User.findOne({
            where: {
                member_id: userID
            }
        });
        let countFollower = await db.Follow.count({
            where: {
                fk_following_id: userID
            }
        });
        let countFollowing = await db.Follow.count({
            where: {
                fk_follower_id: userID
            }
        });
        return {
            userDetail: user,
            followerCount: countFollower,
            followingCount: countFollowing
        };
    } catch (err) {
        throw err;
    }
}

async function fetchUserProductFeed(userID) {
    try {
        return await db.Products.findAll({where: {
            fk_member_id: userID
        }});
    }catch (err){
        throw err;
    }
}


async function orderInfoController(orderObj) {
    console.log(orderObj.charge.id);
    try {
        let orderDetails = await db.OrderInfo.create({
            order_id: orderObj.stripeBody.stripeToken,
            fk_member_id: orderObj.userID,
            stripe_trans_id: orderObj.charge.id,
            stripe_cust_id: orderObj.charge.customer,
            stripe_token: orderObj.stripeBody.stripeToken,
            stripe_email: orderObj.stripeBody.stripeEmail,
            amount_paid: orderObj.charge.amount,
            billing_address: orderObj.storeLocal.data.address,
            billing_pincode: orderObj.storeLocal.data.postcode,
            billing_phone_no: orderObj.storeLocal.data.tell,
            billing_secondary_phone_no: orderObj.storeLocal.data.tell2,
            billing_country: orderObj.storeLocal.data.country
        });

        let purchaseList = await cartController(orderObj.userID);

        let invoiceObj = {
            order: orderObj,
            purchase: purchaseList
        };

        await invoice(invoiceObj);

        orderMailController({ userEmail: orderObj.stripeBody.stripeEmail, orderID: orderObj.stripeBody.stripeToken, userID: orderObj.userID});

        await db.Cart.destroy({
            where:{
                fk_member_id: orderObj.userID
            }
        });
    }catch (err){
        throw err;
    }
}

async function uploadController(uploadObj) {
    try {
        let done = await db.Uploads.create({
                upload_id: uploadObj.userID + '-' + Date.now(),
                email: uploadObj.userEmail,
                title: uploadObj.title,
                description: uploadObj.description,
                mobile_no: uploadObj.mobile,
                category: uploadObj.category,
                type: uploadObj.type,
                price: uploadObj.price,
                filename: uploadObj.filename,
                fk_member_id: uploadObj.userID
            });

        return { uploadID: done.upload_id, email: done.email };
    } catch(err){
        throw err;
    }
}

// Fetching the following_ids
async function userProfileFeedController(sessionUser) {

    try{
        return await db.Follow.findAll({
            where: {
                fk_follower_id: sessionUser
            },
            attributes: [ 'fk_following_id']
        })
    }catch (err){
        throw err;
    }
}

module.exports = {
    categoryController,
    featuredController,
    productController,
    modalController,
    addToCartController,
    cartController,
    fetchUserController,
    followController,
    removeFromCartController,
    orderInfoController,
    uploadController,
    fetchUserProductFeed,
    userProfileFeedController,
    countCartItemController
};