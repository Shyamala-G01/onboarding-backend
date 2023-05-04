// Define the user schema
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comments",
    {
      comments: {
        type: DataTypes.STRING,
      },
    
      updated_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
      updated_by_id:{
        type: DataTypes.STRING,
      },
      fk_comment_users_id:{
        type: DataTypes.STRING,
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return Comments;
};
