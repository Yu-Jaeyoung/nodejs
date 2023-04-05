import {MongoClient, ObjectId} from 'mongodb';

async function getConnection(collection) {
    const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
    const client = await MongoClient.connect(databaseUrl);
    const database = client.db("addressBook");
    return database.collection(collection);
}
export async function createAddress(address) {
    const connection = await getConnection("address")
    await connection.insertOne(address);
    return await findAddressByName(address.name);
}

export async function findAddressById(userId) {
    const connection = await getConnection("address");
    const objectId = new ObjectId(userId);
    return await connection.findOne({"_id": objectId});
}

export async function findAddressByName(name) {
    const connection = await getConnection("address");
    return await connection.findOne({"name": name});
}


export async function findAddress() {
    const connection = await getConnection("address");
    return await connection.find({}).toArray();
}

export async function updateAddressById(userId, address) {
    const connection = await getConnection("address");
    const objectId = new ObjectId(userId);
    await connection.updateOne({"_id": objectId}, {$set: {"address": address}});
    return findAddressById(userId);
}

export async function deleteAddressById(userId) {
    const connection = await getConnection("address");
    const objectId = new ObjectId(userId);
    return await connection.deleteOne({"_id": objectId});
}