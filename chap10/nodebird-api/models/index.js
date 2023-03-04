import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
const env = process.env.NODE_ENV || "development";
import Config from "../config/config.json" assert { type: "json" };
const config = Config[env];

const __dirname = path.resolve();
const __filename = path.resolve();

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs
  .readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
  .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  /*.forEach(file => { // 해당 파일의 모델 불러와서 init
    const model = import(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    return model.initiate(sequelize)
  });*/

Object.keys(db).forEach(modelName => { // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;