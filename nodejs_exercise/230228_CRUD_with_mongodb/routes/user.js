import express from "express";
import {
  registerUser, findAll, findById,
} from "../repository/index.js";

const router = express.Router();

// 해야할일
// status(200) 반환으로 성공 여부 반환하기
// 사용자 등록은 status(201)
// npm install http-status-codes --save // status code 를 자동으로 불러와주는
// get을 할때는 바디로 받는게 없음
// res처리를 해줘야지


router.route("/api/users")
  .get(async (req, res) => {
    const users = await findAll();
    console.log(`${JSON.stringify(users)}`);
    console.log(users);
    res.status(200).send(`${JSON.stringify(users)}`);
  })
  // 이메일, 비밀번호, 유저이름, 닉네임 입력 시 등록 가능
  .post(async (req, res) => {
    if (req.body["email"] && req.body["password"] && req.body["userName"] && req.body["nickName"]) {
      await registerUser(req.body);
      res.status(201).send(`${JSON.stringify(req.body)}`);
    } else {
      console.log(req.body);
      console.log("Create Failed");
    }
  })
  .delete((req, res) => {
    deleteUserByEmailAndPassword(req.body["email"], req.body["password"]);
  });

router.route("/api/users/:userId")
  .patch(async (req, res) => {
    console.log(`${JSON.stringify(req.body)}`);
    console.log();
    const findUser = await findById(req.params.userId);
    if ((findUser.email === req.body.email) && (findUser.password === req.body.password)) {
      console.log(req.params.userId);
      const result = await updateById(req.params.userId, findUser.nickName);
      res.status(200)
        .send(result);
    } else {
      console.log("sorry, I can't update");
    }
  });


export default router;
