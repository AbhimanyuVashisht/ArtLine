const sequelize = require('sequelize');
    // , secret = require('secret.json');

const db = new sequelize(/*dbName*/'projectx', /*username*/'projectxuser', /*password*/'',{
    host: 'localhost',
    dialect: 'mysql'
});


const User = db.define('users', {
    member_id:{
        type: sequelize.DataTypes.STRING,
        primaryKey: true
    },
    token: {
        type: sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    url: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: sequelize.DataTypes.STRING
    },
    email: {
        type: sequelize.DataTypes.STRING
    },
    profile_dp:{
        type: sequelize.DataTypes.STRING
    },
});

const Products = db.define('products', {
    prod_id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    product_path: {
        type: sequelize.DataTypes.STRING,
    },
    price: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    views: {
        type: sequelize.DataTypes.INTEGER,
    },
    rating:{
        type: sequelize.DataTypes.INTEGER,
    },
});

const Category = db.define('categories', {
    cat_id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    category_name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    category_image: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

const Cart = db.define('carts', {
   fk_member_id: {
       type: sequelize.DataTypes.STRING,
       primaryKey: true
   },
    fk_prod_id: {
       type: sequelize.DataTypes.INTEGER,
       primaryKey: true
    }
});

const Follow = db.define('follows', {
   fk_follower_id: {
       type: sequelize.DataTypes.STRING,
       primaryKey: true,
       foreignKey: User
   },
    fk_following_id: {
       type: sequelize.DataTypes.STRING,
        primaryKey: true,
        foreignKey: User
    }
});

const Organisation = db.define('organisations', {
    organization_id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true
    },
    organization_name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

const Uploads = db.define('uploads', {
    upload_id: {
        type: sequelize.DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: sequelize.DataTypes.STRING,
    },
    description: {
        type: sequelize.DataTypes.STRING,
    },
    mobile_no: {
        type: sequelize.DataTypes.STRING,
    },
    category: {
        type: sequelize.DataTypes.STRING
    },
    type: {
        type: sequelize.DataTypes.STRING
    },
    price: {
        type: sequelize.DataTypes.INTEGER,
    },
    filename: {
        type: sequelize.DataTypes.STRING,
    },
    fk_member_id: {
        type: sequelize.DataTypes.STRING
    }
});

const OrderInfo = db.define('orderinfos', {
    order_id: {
        type: sequelize.DataTypes.STRING,
        // autoIncrement: true,
        primaryKey: true,
    },
    fk_member_id: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    stripe_trans_id: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    stripe_cust_id: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    stripe_token: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    stripe_email: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    amount_paid: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    billing_address: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    billing_pincode: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    billing_phone_no: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    billing_secondary_phone_no: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    billing_country: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

// One to Many Relation
Category.hasMany(Products, {foreignKey: 'fk_category_id'});

User.hasMany(Products, {foreignKey: 'fk_member_id'});

Organisation.hasMany(User, {foreignKey: 'fk_organisation_id'});

User.hasMany(Uploads, {foreignKey: 'fk_member_id'});

Category.hasMany(User, {foreignKey: 'fk_category_id'});

User.hasMany(OrderInfo, {foreignKey: 'fk_member_id'});

// ManyToMany Relation
User.belongsToMany(Products, { through: Cart, foreignKey: 'fk_member_id' });
Products.belongsToMany(User, { through: Cart, foreignKey: 'fk_prod_id' });

User.belongsToMany(User, { as: 'follower', through: Follow });



db.sync().then(()=>{
    console.log("Database Ready");
});


module.exports = {
    db,
  User,
  Products,
  Category,
  Organisation,
  Cart,
  Follow,
  OrderInfo,
  Uploads
};