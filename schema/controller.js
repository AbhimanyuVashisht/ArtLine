const db = require('./db');

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

    // return await db.User.findOne({
    //
    //     include: [{
    //         model: db.Products,
    //         required: true,
    //         where: {
    //             prod_id: pid
    //         },
    //     }]
    // });

    return await db.db.query("SELECT * FROM users, products WHERE products.prod_id = '"+ pid + "' AND users.member_id = products.fk_member_id;");
}

async function addToCartController(user, pid) {
    console.log(user);
    if( user ){
        console.log('yea');
        db.Cart.findOne({
            where: {
                $and: {
                    fk_member_id: user,
                    fk_prod_id: pid
                }
            }
        })
            .then(async (elem)=>{
                if(elem) {
                    return 'Already Added';
                }else{
                    console.log('hey here');
                    await db.Cart.create({fk_member_id: user, fk_prod_id: pid});
                    return 'Added';
                }
            })
            .catch(async (err)=>{
                await db.Cart.create({fk_member_id: user, fk_prod_id: pid});
                return 'Added';
            })
    }else{
        return 'Login to Add'
    }
}

async function removeFromCartController(user, pid) {
    console.log(user);
    // user = 105864670115367217760;
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

async function cartController() {
    // need to add the user
    try{
        let joinList = await db.User.findAll({
                include: [{
                    model: db.Products,
                    through: {
                        where: { fk_member_id:'109484023739009832780' }
                    }
                }]
            });
        for( let i in joinList){
            if( joinList[i].dataValues.member_id === '109484023739009832780' ){
                return joinList[i].dataValues.products;
            }
        }

    }catch (err){
        console.log(err);
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
                    console.log(err);
                })
            }
        }).catch((err)=>{
            console.log(err);
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
        console.log(err);
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
    removeFromCartController
};