/*const Sequelize = require("sequelize");*/
import Sequelize from "sequelize";

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      name: {
        type: Sequelize.STRING(20),
        allowNULL: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNULL: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNULL: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNULL: true,
      },
      create_at: {
        type: Sequelize.DATE,
        allowNULL: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: "User",
      tableName: "Users",
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment,{foreignKey:'commenter', sourceKey: 'id'});
  }
};

/*module.exports = User;*/
export default User;