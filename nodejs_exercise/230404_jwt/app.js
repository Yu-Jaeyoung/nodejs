import {MongoClient} from "mongodb";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.set("port", 8888);

const secretKey = "addressBook";
const expireOption = {algorithm: "HS256", expiresIn: "30m", issuer: "issuer"};

const router = express.Router();

async function getConnection() {
  const databaseUrl = "mongodb://Yu-Jaeyoung:nodejs@localhost:27017/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressBook");
  return database.collection("address");
}

export async function findUser(username) {
  const user = await getConnection();
  return await user.find({"username": username}).toArray();
}

export async function createUser(info) {
  const user = await getConnection();
  return await user.insertOne(info);
}

router.route("/api/signup")
  .post(async (req, res) => {
    let user = await createUser(req.body);
    console.log(user);
    res.json({message: "Sign Up!!!"}).status(201);
  });

router.route("/api/signin")
  .post(async (req, res) => {
    if (req.body["username"] && req.body["password"]) {
      let user = await findUser(req.body["username"]);
      if (user[0] !== undefined && user[0].password === req.body["password"]) {
        jwt.sign(
          {username: user[0].username},
          secretKey,
          expireOption,
          (err, token) => {
            console.log(token);
            console.log(err);
            res.status(200).send({token});
          },
        );
      }
    }
  });

router.route("/api/test")
  .get(async (req, res) => {
    let token = req.header("Authorization");
    let result = jwt.verify(token, secretKey).username;
    console.log(result);
  });

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
// 이게바로 석사 ????? 탐난다다