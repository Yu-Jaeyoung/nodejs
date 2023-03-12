import {MongoClient} from "mongodb";
import {ObjectId} from "mongodb";
/*
Example From
{
  "userName" : "Jaeyoung",
  "address" : "Sejong-si Dodam-dong",
  "phoneNumber" : "010-xxxx-xxxx",
  "email" : "Jaeyoung@wisoft.io"
}
*/

async function getConnection() {
  const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressBook");
  return database.collection("address");
}

export async function createInfo(Info) {
  const addressBook = await getConnection();
  return await addressBook.insertOne(Info);
}

export async function readAllInfo() {
  const addressBook = await getConnection();
  return await addressBook.find({}).toArray();
}

export async function readInfoByName(userName) {
  const addressBook = await getConnection();
  return await addressBook.find({"userName": userName}).toArray();
}

export async function readInfoByEmail(email) {
  const addressBook = await getConnection();
  return await addressBook.find({"email": email}).toArray();
}

export async function readInfoByAddress(address) {
  const addressBook = await getConnection();
  return await addressBook.find({"address": {$regex: address}}).toArray();
}

export async function updateUserNameById(_id, userName) {
  const addressBook = await getConnection();
  return await addressBook.updateOne({"_id": _id}, {$set: {"userName": userName}});
}

export async function updateAddressById(_id, address) {
  const addressBook = await getConnection();
  return await addressBook.updateOne({"_id": _id}, {$set: {"address": address}});
}

export async function updatePhoneNumberById(_id, phoneNumber) {
  const addressBook = await getConnection();
  return await addressBook.updateOne({"_id": _id}, {$set: {"phoneNumber": phoneNumber}});
}

export async function updateEmailById(_id, email) {
  const addressBook = await getConnection();
  return await addressBook.updateOne({"_id": _id}, {$set: {"email": email}});
}

export async function deleteById(userId) {
  const connection = await getConnection();
  const objectId = new ObjectId(userId);
  await connection.deleteOne({"_id": objectId});
}


// 위 방법처럼 users.js 내용을 줄일 수 있지 않을까?
/*
export async function foundUserCheck(foundUser) {
  if (foundUser === undefined) {
    res.status(406).send(`${JSON.stringify(foundUser)}`);
    console.log("Not Found");
  } else {
    res.status(200).send(`${JSON.stringify(foundUser)}`);
    console.log("Found");
  }
}*/
