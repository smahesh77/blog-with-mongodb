const db = require('../config/db')

const postModel = db.model("comment", new db.Schema({
  commentBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  PostId: {
    type:  db.Schema.Types.ObjectId,
    ref: "Posts",
  }
  

}))

module.exports = postModel



// module.exports = (sequelize, DataTypes) => {
//   const Comments = sequelize.define("comments", {// same as mongoose.model("name", schema)
//     commentBody: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//   });

//   return Comments;
// }
