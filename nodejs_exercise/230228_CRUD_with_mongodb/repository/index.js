import connect from "./connect.js";


/*
// Example form
const newUser = {
  "email": "Jaeyoung@wisoft.io",
  "password": "nodejs",
  "userName": "Jaeyoung",
  "nickName": "Jack"
};
*/

// create
export async function registerUser(newUser) {
  const connection = await connect();
  connection.insertOne(newUser);
}

// read
export async function findUserByUserName(userName) {
  const connection = await connect();
  connection.findOne({"userName": userName}, {_id: 0});
}

export async function findAllUser() {
  const connection = await connect();
  connection.find({});
}

// update
export async function updateNickNameByEmailAndPassword(email, password, nickname) {
  const connection = await connect();
  connection.updateOne({"email": email, "password": password}, {$set: {"nickname": nickname}});
}


// delete
export async function deleteUserByEmailAndPassword(email, password) {
  const connection = await connect();
  connection.deleteOne({"email": email, "password": password});
}



