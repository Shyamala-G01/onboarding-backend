module.exports = (sequelize, DataTypes) => {
  const EducationalInfo = sequelize.define(
    "educational_info",
    {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      board: {
        type: DataTypes.STRING,
      },
      course: {
        type: DataTypes.STRING,
      },
      specialization: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      marks: {
        type: DataTypes.INTEGER,
      },
      marks_card: {
        type: DataTypes.STRING,
      },
      provisional_marks_card: {
        type: DataTypes.STRING,
      },
      convocation_certificate: {
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
  return EducationalInfo;
};
