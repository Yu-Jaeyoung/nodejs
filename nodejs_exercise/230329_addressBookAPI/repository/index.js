import {MongoClient} from "mongodb";

async function getUserConnection() {
  const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressBook");
  return database.collection("user");
}

export async function createUser(info) {
  const user = await getUserConnection();
  return await user.insertOne(info);
}

export async function checkVerifiedUser(info) {
  const user = await getUserConnection();
  console.log(info.id);
  return await user.find({"id": info.id, "password": info.password, "master": "O"}).toArray();
}

async function getAddressConnection() {
  const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressBook");
  return database.collection("address");
}

export async function addAddressInfo(info) {
  const address = await getAddressConnection();
  return await address.insertOne(info);
}

export async function getAddressInfo() {
  const address = await getAddressConnection();
  return await address.find().toArray();
}

// 업데이트는 생각이 조금 더 필요해 보임.
/*
export async function updateAddressInfo() {
  const address = await getAddressConnection();
  return await address.updateOne();
}
*/

export async function deleteAddressInfo(info) {
  console.log(info);
  const address = await getAddressConnection();
  return await address.deleteOne(info);
}



