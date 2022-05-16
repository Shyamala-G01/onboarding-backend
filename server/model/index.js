const config = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const { database } = require("../config/db.config");

// Creating instance or Configuring
const sequelize = new Sequelize("ON_BOARDING", "fullStack", "root@123", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Authenticate / To connect to database

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect!!!");
  })
  .catch((err) => {
    console.log(err);
  });

//
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Adding the instances of models
db.admin = require("./admin.model")(sequelize, DataTypes);
db.user = require("./user.model")(sequelize, DataTypes);
db.roles = require("./roles.model")(sequelize, DataTypes);
db.personalInfo = require("./personalInfo.model")(sequelize, DataTypes);
db.address = require("./address.model")(sequelize, DataTypes);
db.employmentDetails= require("./employmentDetails.model")(sequelize, DataTypes);


// Syncing table with schema
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sync");
  })
  .catch((err) => {
    console.log(err);
  });

// Association
db.roles.hasMany(db.admin, {
  as: "RoleAlias",
  foreignKey: { name: "fk_admins_roles_role" },
});

db.admin.belongsTo(db.roles, {
  as: "adminAlias",
  foreignKey: { name: "fk_admins_roles_role" },
});

db.roles.hasMany(db.user, {
  as: "userAlias",
  foreignKey: { name: "fk_users_roles_role" },
});

db.user.belongsTo(db.roles, {
  as: "AliasRoles",
  foreignKey: { name: "fk_users_roles_role" },
});

db.user.hasOne(db.personalInfo, {
  foreignKey: "fk_person_users_id",
  as: "personal_info",
});

db.personalInfo.belongsTo(db.user, {
  foreignKey: "fk_person_users_id",
  as: "users",
});

db.user.hasMany(db.address, {
  foreignKey: "fk_address_users_id",
  as: "address",
});

db.address.belongsTo(db.user, {
  foreignKey: "fk_address_users_id",
  as: "users",
});

db.user.hasMany(db.employmentDetails, {
  foreignKey: "fk_employment_users_id",
  as: "employment_details",
});

db.employmentDetails.belongsTo(db.user, {
  foreignKey: "fk_employment_users_id",
});
module.exports = db;
