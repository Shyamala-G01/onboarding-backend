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
      offer_letter:{
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      password_status: {
        type: DataTypes.STRING,
      },photo:{
        type:DataTypes.STRING
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
