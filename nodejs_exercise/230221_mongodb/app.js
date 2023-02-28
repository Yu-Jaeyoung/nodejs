import {MongoClient} from "mongodb";

async function connectDB() {
  const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("Homework");
  return database.collection("users");
}


async function registerUser(newUser) {
  const collection = await connectDB();
  await collection.insertOne(newUser);
  console.log("Create Success");
}

async function printAll() {
  const collection = await connectDB();
  console.log(`users => ${JSON.stringify(await collection.find().toArray())}`);
}

async function findOneByName(name) {
  const collection = await connectDB();
  const findUser = await collection.findOne({"name": name});
  console.log(`findUser => ${JSON.stringify(await findUser)}`);
}

async function findOneByEmail(email) {
  const collection = await connectDB();
  const findUser = await collection.findOne({"email": email});
  console.log(`findUser => ${JSON.stringify(await findUser)}`);
}

async function updateUserByName(name, updatedEmail) {
  const collection = await connectDB();
  await collection.updateOne({"name": name}, {$set: {"email": updatedEmail}});
  console.log("Update completed");
}

async function deleteUserByName(name) {
  const collection = await connectDB();
  await collection.deleteOne({"name": name});
}


async function main() {

  const newUser = {
    name: "Juno",
    email: "Juno@naver.com",
  };

  await registerUser(newUser);
  await printAll();
  await findOneByEmail("Juno@naver.com");
  await findOneByName("Juno");
  await updateUserByName("Juno", "Juno@hanbat.ac.kr");
  await findOneByEmail("Juno@naver.com");
  await printAll();
  await deleteUserByName("Juno");
}

main();
