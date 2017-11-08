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
    }
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

// One to Many Relation
Category.hasMany(Products, {foreignKey: 'fk_category_id'});

User.hasMany(Products, {foreignKey: 'fk_member_id'});

Organisation.hasMany(User, {foreignKey: 'fk_organisation_id'});

Category.hasMany(User, {foreignKey: 'fk_category_id'});


db.sync().then(()=>{
    console.log("Database Ready");
});


module.exports = {
  User,
  Products,
  Category,
  Organisation
};