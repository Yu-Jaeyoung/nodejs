import express from "express";

const router = express.Router();

let users = [
  {
    id: "1",
    name: "유재영",
    grade: "Silver",
  },
];

const findUserById = (id) => {
};

router.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  //res.send(users);
});

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  let result = {};
  for (const user of users) {
    console.log(`user: ${JSON.stringify(user)}`);
    if (user.id === req.params.id) {
      result = user;
    }
  }
  console.log(`result: ${JSON.stringify(result)}`);
  res.send(result);
});

router.patch("/patch/:id", (req, res) => {
  let result = {};
  for (const user of users) {
    if (user.id === req.params.id) {
      user.grade = req.query.grade;
      result = user;
    }
  }
  res.send(result);
});

router.delete("/:id/delete", (req, res) => {
  for (const user of users) {
    if (user.id === req.params.id) {
      res.send(`${req.params.name} 님이 삭제되었습니다. `);
      users.splice(req.params.id - 1, 1);
    }
  }
});

export default router;