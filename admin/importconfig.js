
const csv = require('csvtojson')
    , sequelize = require('sequelize')
    , readline = require('readline')
    , Op = sequelize.Op;

let csvFilePath;
const db = new sequelize(/*dbName*/'projectx', /*username*/'projectxuser', /*password*/'',{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: { $and: Op.and }
});


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter \n <1> Importing Category \n  <2> Importing Product \n Enter your choice :", (ans)=>{
    if(ans == 1){
        csvFilePath = 'importCategory.csv';

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


        csv().fromFile(csvFilePath)
            .on('json', (catObj)=>{
                Category.findOne({
                    where: {
                        cat_id: catObj.cat_id
                    }
                }).then((done)=>{
                    if(done){
                        Category.update({
                            category_name: catObj.category_name,
                            category_image: catObj.category_image
                        }, {
                            where: {
                                cat_id: catObj.cat_id
                            }
                        }).then((done)=>{
                            console.log('DataSet Updated');
                        }).catch((err)=>{
                            console.log(err);
                        })
                    }else{
                        Category.create(catObj)
                            .then(()=>{
                                console.log('New DataSet Inserted');
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                    }
                })
                    .catch((err)=>{
                        console.log(err);
                    })
                // console.log(catObj);
            })
            .on('done', ()=>{
                console.log('Import Done');
            });


    }else if(ans == 2){
        csvFilePath = 'importProduct.csv';

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
            fk_category_id:{
                type: sequelize.DataTypes.INTEGER,
            },
            fk_member_id:{
                type: sequelize.DataTypes.STRING
            }
        });


        csv().fromFile(csvFilePath)
            .on('json', (prodObj)=>{
                console.log(prodObj);
                Products.findOne({
                    where: {
                        prod_id: prodObj.prod_id
                    }
                }).then((done)=>{
                    if(done){
                        Products.update({
                            product_name: prodObj.product_name,
                            description: prodObj.description,
                            product_path: prodObj.product_path,
                            price: prodObj.price,
                            fk_category_id: prodObj.fk_category_id,
                            fk_member_id: prodObj.fk_member_id
                        }, {
                            where: {
                                prod_id: prodObj.prod_id
                            }
                        }).then((done)=>{
                            console.log('DataSet Updated');
                        }).catch((err)=>{
                            console.log(err);
                        })
                    }else{
                        Products.create(prodObj)
                            .then(()=>{
                                console.log('New DataSet Inserted');
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                    }
                })
                    .catch((err)=>{
                        console.log(err);
                    })
            })
            .on('done', ()=>{
                console.log('Import Done');
            });
    }
});