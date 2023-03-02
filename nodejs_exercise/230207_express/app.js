import express from "express";

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(express.json());

const users = [];
app.get("/api/greet", (req, res) => {
  if (!req.query.name) {
    res.send("Hello, Greet!");
  } else {
    res.send(`Hello, ${req.query.name}`);
  }
});

app.post("/api/users", (req, res) => {
  // console.log(`body: ${JSON.stringify(req.body)}`) : body 부분을 String으로 타입 변환하여 출력 진행
  users.push(req.body);
  console.log(req.body);
  res.send(`${req.body.name}님이 추가되었습니다.`);
});

app.get("/api/users", (req, res) => {
  const allUsers = users.map(element => element);
  console.log(allUsers);
  res.send(`${JSON.stringify(allUsers)}`);
  /*res.send(allUsers);*/
});

app.get("/api/users/:id", (req, res) => {
  let searchUser = {};
  for (const user of users) {
    if (user.id == req.params.id) {
      searchUser = user;
    }
  }
  res.send(searchUser);
});

app.patch("/api/users/:id", (req, res) => {
  for (const user of users) {
    if (user.id == req.params.id) {
      user.level = req.body.level;
    }
  }
});

app.delete("/api/users/:id", (req, res) => {
  for (const user of users) {
    if (user.id == req.params.id) {
      users.splice(req.params.id - 1, 1);
    }
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port stand by...");
});

