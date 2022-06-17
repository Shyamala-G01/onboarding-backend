module.exports = (sequelize, DataTypes) => {

  const PersonalInfo = sequelize.define(
    "personal_info",
    {
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      gender: {
        type: DataTypes.STRING,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
      alternate_number: {
        type: DataTypes.STRING,
      },
      personal_email: {
        type: DataTypes.STRING,
      },
      father_name :{
        type:DataTypes.STRING
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
      status: {
        type: DataTypes.STRING,
      },

    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  PersonalInfo.removeAttribute('id');
  return PersonalInfo;
};
