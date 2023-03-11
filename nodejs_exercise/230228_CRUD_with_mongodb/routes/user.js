import express from "express";
import {
  registerUser, findAll, updateById, findIdByEmailPassword, deleteById,
} from "../repository/index.js";

const router = express.Router();

// npm install http-status-codes --save // status code 를 자동으로 불러와주는

router.route("/api/users")
  // 등록된 대상 전체에 대해서 출력 진행
  .get(async (req, res) => {
    const users = await findAll();
    console.log(`${JSON.stringify(users)}`);
    res.status(200).send(`${JSON.stringify(users)}`);
  })

  // 이메일, 비밀번호, 유저이름, 닉네임 입력 시 등록 가능하게 설정
  // 실패한 경우엔 콘솔에 만찍어서 보냄 / post 요청에 대해 res 보낼 필요는 없을 듯
  .post(async (req, res) => {
    console.log(req.body);
    if (req.body["email"] && req.body["password"] && req.body["userName"] && req.body["nickName"]) {
      await registerUser(req.body);
      res.status(201).send(`${JSON.stringify(req.body)}`);
    } else {
      console.log(req.body);
      console.log("Create Failed");
    }
  })

  .patch(async (req, res) => {
    // body로는 email, password, nickname을 받음
    // body로 들어온 정보 중 닉네임 변경 진행 예정

    // 콘솔에 들어온 body의 내용을 stringify해서 찍음
    console.log(`${JSON.stringify(req.body)}`);

    // email, password 이용해 id를 받아옴
    const foundUserId = await findIdByEmailPassword(req.body.email, req.body.password);

    // 찾은 id를 활용, 대상에 대해서 닉네임 patch 진행
    // 문제점은 foundUserId가 존재하는 경우에만 updateById를 불러와서 실행하고 싶은데
    // 그 과정을 (!foundUserId)를 활용하게 되면 작동이 안하는 상황이 발생
    // 이 부분은 JS 문법을 공부 한후 수정하는 과정이 필요해보임
    const result = await updateById(foundUserId, req.body.nickName);
    res.status(200).send(result);

    /*
     else {
      res.status(404).send("Patch Failed");
    }
    */
  })

  .delete(async (req, res) => {
    // body로 delete할 대상의 아이디와 비밀번호를 받음
    // 콘솔에 들어온 body의 내용 출력
    console.log(`${JSON.stringify(req.body)}`);

    // email, password를 이용해 사용자 id를 받아옴
    // 해당 대상이 존재한다면
    const foundUserId = await findIdByEmailPassword(req.body.email, req.body.password);

    // 찾은 id를 활용해서 대상 삭제 진행
    // 이 부분도 역시 (!foundUserId)를 활용하면 정상적으로 작동하지 않음
    const result = await deleteById(foundUserId);
    res.status(200).send(result);
    /*
    else {
      res.status(404).send("Delete Failed");
    }
    */
  });


export default router;