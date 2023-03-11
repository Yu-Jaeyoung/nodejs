import connect from "./connect.js";
import {ObjectId} from "mongodb";

/*
// Example form
const newUser = {
  "email": "Jaeyoung@wisoft.io",
  "password": "nodejs",
  "userName": "Jaeyoung",
  "nickName": "Jack"
};
*/

// JS 공부 진행 후 이해해야될 부분
// 왜 return 하는 과정에서도 await이 붙어야할까 ??

// create
export async function registerUser(newUser) {
  const connection = await connect();
  return await connection.insertOne(newUser);
}


// get
// get 부분에서는 toArray 처리를 하지 않고, await을 붙이면 경고가 발생하는데 왜그러는 걸까?
// toArray() 유무에 따라 성공 여부가 갈리는 것을 확인할 수 있었음

export async function findAll() {
  const connection = await connect();
  return await connection.find({}).toArray();
}

export async function findIdByEmailPassword(email, password) {
  const connection = await connect();
  const foundUser = await connection.findOne({"email": email, "password": password});
  return new ObjectId(foundUser["_id"]); // ObjectId를 씌우는 작업?
}

// update
export async function updateById(_id, nickName) {
  const connection = await connect();
  return await connection.updateOne({"_id": _id}, {$set: {"nickName": nickName}});
}

// delete

export async function deleteById(_id) {
  const connection = await connect();
  return await connection.deleteOne({"_id": _id});
}


