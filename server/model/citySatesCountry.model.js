// Define the  cityStatesCountry schema
module.exports = (sequelize, DataTypes) => {
    const States = sequelize.define(
      "tb_country",
      {
        ID: {
          type: DataTypes.INT,
        
        },
       City: {
          type: DataTypes.TEXT,
        },
        District: {
          type: DataTypes.TEXT,
        },
        State: {
          type: DataTypes.TEXT,
        },
        Country: {
          type: DataTypes.TEXT,
        }
      
      },
      {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    );
    return States;
  };
  