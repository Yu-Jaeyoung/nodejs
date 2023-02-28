import {MongoClient} from "mongodb";

const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
const client = await MongoClient.connect(databaseUrl);
const database = client.db("Homework");
const collection = database.collection("users");


async function create(newUser) {
  await collection.insertOne(newUser);
  console.log("Create Success");
}

async function printAll() {
  console.log(`users => ${JSON.stringify(await collection.find().toArray())}`);
}

async function findOneWithName(name) {
  const findUser = await collection.findOne({"name": name});
  console.log(`findUser => ${JSON.stringify(await findUser)}`);
}

async function findOneWithEmail(email) {
  const findUser = await collection.findOne({"email": email});
  console.log(`findUser => ${JSON.stringify(await findUser)}`);
}

async function updateUsersEmail(name, updatedEmail) {
  await collection.updateOne({"name": name}, {$set: {"email": updatedEmail}});
  console.log("Update completed");
}
async function deleteUser(name) {
  await collection.deleteOne({"name": name});
}




async function main() {

  const newUser = {
    name: "Juno",
    email: "Juno@naver.com",
  };

  await create(newUser);
  await printAll();
  await findOneWithEmail("Juno@naver.com");
  await findOneWithName("Juno");
  await updateUsersEmail("Juno", "Juno@hanbat.ac.kr");
  await findOneWithEmail("Juno@naver.com");
  await printAll();
  await deleteUser("Juno");
}

main();
