
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {// same as mongoose.model("name", schema)
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  
    // users.associate = (models) => { 
    //     users.hasMany(models.Posts, {
    //       onDelete: "cascade"
    //     })
    //  }

  
    return users;
  };