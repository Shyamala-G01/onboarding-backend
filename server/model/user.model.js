
// Define the user schema
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "users",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        phone_number: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        designation: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        created_by: {
          type: DataTypes.STRING,
        },
        updated_at:{
            type : DataTypes.DATE
        },
        updated_by:{
            type : DataTypes.STRING
        },
        status : {
            type : DataTypes.INTEGER
        }
      },
      {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    );
    return User;
  };
  