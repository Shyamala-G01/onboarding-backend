module.exports = (sequelize, DataTypes) => {
  const Declaration = sequelize.define(
    "declaration",
    {
      joining_date: {
        type: DataTypes.DATE,
      },
      place: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.STRING,
      }, status: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return Declaration;
};
