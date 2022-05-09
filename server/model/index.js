const config = require('../config/db.config');
const { Sequelize, DataTypes}  = require('sequelize');
const { database } = require('../config/db.config');


// Creating instance or Configuring
const sequelize = new Sequelize("ON_BOARDING","fullStack","root@123",{
    host : "localhost",
    dialect : "mysql",
    operatorsAliases : true,
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});


// Authenticate / To connect to database

sequelize.authenticate().then(()=>{
    console.log("Connect!!!")
}).catch((err)=>{
    console.log(err)
})

// 
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require('./admin.model')(sequelize,DataTypes);

// Syncing table with schema
db.sequelize.sync({ force : false}).then(()=>{
    console.log("Sync")
}).catch(err =>{
    console.log(err)
})

module.exports = db;