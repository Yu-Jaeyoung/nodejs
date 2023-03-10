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
  return connection.insertOne(newUser);
}

// read
export async function findAll() {
  const connection = await connect();
  return connection.find({});
}

export async function findById(email) {
  const connection = await connect();
  return connection.find({"email": email});
}


// update


// delete
export async function deleteUserByEmailAndPassword(email, password) {
  const connection = await connect();
  connection.deleteOne({"email": email, "password": password});
}



