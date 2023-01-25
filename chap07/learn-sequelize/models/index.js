/*
import {Sequelize} from "sequelize";
*/

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize("nodejs","root","비밀번호 문제는 아닌데...", {
  dialect:"mysql",
  host:"127.0.0.1",
  port: 3306
});

db.sequelize = sequelize;

module.exports = db;