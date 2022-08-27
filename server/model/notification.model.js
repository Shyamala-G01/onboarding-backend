module.exports =(sequelize,DataTypes)=>{
    const Notification = sequelize.define(
        "notification",
        {
            id:{
          type:DataTypes.INTEGER,
          primaryKey: true,
            },
        name:{
            type:DataTypes.STRING
        },
        message:{
            type:DataTypes.STRING
        },
        noti_date: {
            type: DataTypes.DATE,
          },
         
        },
        {
          freezeTableName: true,
          timestamps: false,
          underscored: true,
        }
      );
      return Notification;
    };
    