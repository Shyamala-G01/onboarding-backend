const { Sequelize, DataTypes } = require("sequelize/types");


// Define the  admin schema 
module.exports = ( sequelize, DataTypes ) =>{
    const Admin = sequelize.define("admins",{
        id : {
            type : DataTypes.String,
            primaryKey : true
        },
        name : {
            type : DataTypes.String
        },
        email : {
            type : DataTypes.String
        },
        phone_number :{
            type : DataTypes.String
        },
        password : {
            type : DataTypes.String
        },
        designation:{
            type : DataTypes.String
        },
        created_at:{
            type : Date()
        },
        created_by_admin:{
            type : DataTypes.String
        }
    },{
        freezeTableName : true,
        timestamps : false,
        underscored : true
    })
    return Admin
}