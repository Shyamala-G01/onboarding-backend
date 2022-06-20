module.exports = (sequelize, DataTypes) => {
  const ProofCertificate = sequelize.define(
    "proof_certificate",
    {
      aadhar_card_number: {
        type: DataTypes.STRING,
      },
      aadhar: {
        type: DataTypes.STRING,
      },
      pan_card_number: {
        type: DataTypes.STRING,
      },
      pan_card: {
        type: DataTypes.STRING,
      },
      passport_number: {
        type: DataTypes.STRING,
      },
      passport_expire_date: {
        type: DataTypes.STRING,
      },
      passport: {
        type: DataTypes.STRING,
      },
      covid_certificate: {
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
  return ProofCertificate;
};
