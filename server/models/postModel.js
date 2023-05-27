const db = require('../config/db')

const postModel = db.model("post", new db.Schema({
    title: {
        type: String,
        required: true,
    },
    postText: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },
  
}))

module.exports = postModel





// module.exports = (sequelize, DataTypes) => {
//   const Posts = sequelize.define("Posts", {// same as mongoose.model("name", schema)
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     postText: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//    Posts.associate = (models) => { //models will have access to all models
//       Posts.hasMany(models.comments, { // as one post will have many comments also make sure that you give the same name as that of the table in db comments not CommentModel
//         onDelete: "cascade"// so that all the commnets get deleted when the post is deleted
//       })
//    }

//   return Posts;
// };