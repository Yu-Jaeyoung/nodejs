// 몽고DB 연결 정의

import {MongoClient} from "mongodb";

export default async function connect(){
  const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("sns");
  return database.collection("users");
}