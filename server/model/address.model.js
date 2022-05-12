
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "address",
    {
      type: {
        type: DataTypes.STRING,
      },
      house_no: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      locality: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      pincode: {
        type: DataTypes.STRING,
      },
      country: {
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
      fk_address_users_id: {
        type: DataTypes.STRING,
        foreignKey: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return Address;
};
