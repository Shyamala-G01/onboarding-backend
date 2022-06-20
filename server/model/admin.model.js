
// Define the  admin schema
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admins",
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
      photo:{
        type:DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE,
      },
      created_by_admin: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return Admin;
};
