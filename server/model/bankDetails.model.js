module.exports = (sequelize, DataTypes) => {
    const BankDetails = sequelize.define(
      "bank_details",
      {
        account_holder_name: {
          type: DataTypes.STRING,
        },
        account_number: {
          type: DataTypes.STRING,
        },
        account_type: {
          type: DataTypes.STRING,
        },
        bank_name: {
          type: DataTypes.STRING,
        },
        ifsc_code: {
          type: DataTypes.STRING,
        },
        pf_account_number: {
          type: DataTypes.STRING,
        },
        uan_account_number: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
        },
        updated_by: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    );
    return BankDetails;
  };
  