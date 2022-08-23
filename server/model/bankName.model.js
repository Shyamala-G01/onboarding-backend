// Define the  bank schema
module.exports = (sequelize, DataTypes) => {
    const BankNames = sequelize.define(
      "tb_bank",
      {
        bank_code : {
          type: DataTypes.INTEGER,
        
        },
       bank_name: {
          type: DataTypes.TEXT,
        },
       
      },
      {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    );
    return BankNames;
  };
  