import mongoose from "mongoose";

const {MONGO_ID, MONGO_PASSWORD, NODE_ENV} = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;
//위 const 변수들이 정상적으로 작동하지 않음

const connect = () => {
  //console.log(MONGO_URL);
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect("mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin", {
    dbName: 'nodejs',
    useNewUrlParser: true,
  });
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

export default connect;