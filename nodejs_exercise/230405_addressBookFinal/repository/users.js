import {MongoClient, ObjectId} from 'mongodb';

export async function getConnection(collection) {
    const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
    const client = await MongoClient.connect(databaseUrl);
    const database = client.db("addressBook");
    return database.collection(collection);
}

export async function registerUser(users) {
    let connection = await getConnection("users");
    await connection.insertOne(users);
    return findByUserId(users.id);
}

export async function findById(userId) {
    const connection = await getConnection("users");
    const objectId = new ObjectId(userId);
    return await connection.findOne({"_id": objectId});
}

export async function findByUserId(userId) {
    const connection = await getConnection("users");
    return await connection.findOne({"id": userId});
}

export async function updateUserById(userId, username) {
    const connection = await getConnection("users");
    const objectId = new ObjectId(userId);
    await connection.updateOne({"_id": objectId}, {$set: {"username": username}});
    return await findById(userId);
}

export async function deleteById(userId) {
    const connection = await getConnection("users");
    const objectId = new ObjectId(userId);
    await connection.deleteOne({"_id": objectId});
}

export async function findUserByIdPassword(id, password){
    const connection = await getConnection("users");
    return await connection.findOne({"id": id,"password":password});
}