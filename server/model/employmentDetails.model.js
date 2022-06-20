module.exports = (sequelize, DataTypes) => {
  const EmploymentDetails = sequelize.define(
    "employment_details",
    {type:{
      type:DataTypes.STRING
    },
      org_name: {
        type: DataTypes.STRING,
      },
      joining_date: {
        type: DataTypes.DATE,
      },
      relieving_date: {
        type: DataTypes.DATE,
      },
      relieving_letter: {
        type: DataTypes.STRING,
      },
      offer_letter: {
        type: DataTypes.STRING,
      },
      pay_slip1: {
        type: DataTypes.STRING,
      },
      pay_slip2: {
        type: DataTypes.STRING,
      },
      pay_slip3: {
        type: DataTypes.STRING,
      },
      hr_name: {
        type: DataTypes.STRING,
      },
      notice_date: {
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
  return EmploymentDetails;
};
