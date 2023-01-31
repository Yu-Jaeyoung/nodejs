/*const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");*/

import Sequelize from "sequelize";
import User from "./user.js";
import Comment from "./comment.js";

const env = process.env.NODE_ENV || "development";
import config from '../config/config.json[env]'
// const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

/*module.exports = db;*/
export default db;