module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "roles",

    {
      role_id: {
        type: DataTypes.INTEGER,
      },

      role: {
        type: DataTypes.STRING,

        primaryKey: true,
      },
    },

    {
      freezeTableName: true,

      timestamps: false,

      underscored: true,
    }
  );

  return Roles;
};
