/*const Sequelize = require("sequelize");*/
import Sequelize from 'sequelize';

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNULL: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNULL: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: "Comment",
      tableName: "comments",
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, {foreignKey: "commenter", tartgetKey: "id"});
  }
};

/*module.exports = Comment;*/
export default Comment;
