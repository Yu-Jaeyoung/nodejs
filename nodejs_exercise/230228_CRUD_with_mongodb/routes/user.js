import express from "express";
import {
  registerUser,
  deleteUserByEmailAndPassword,
  updateNickNameByEmailAndPassword,
  findUserByUserName,
  findAllUser,
} from "../repository/index.js";

const router = express.Router();

router.route("/")
  // userName으로 사용자 정보를 받아오는 경우, id는 미출력
  // 뭐가 문제일까...........................
  .get((req, res) => {
    const users = findAllUser();
    console.log(`${JSON.stringify(users)}`);
    console.log(users);
    res.send(`${JSON.stringify(users)}`);
    /*
        console.log(`${JSON.stringify(findUserByUserName(req.body["userName"]))}`);
    */
  })
  // POST 과정에서 정확한 형태의 객체가 넘어오나 체크 필요
  // req.body 들이 존제하는가 체크
  // 중복 입력에 대한 처리가 없는 상태
  // post 과정에서 프론트적으로 성공여부 전달하는 방법이 무엇일까?
  .post((req, res) => {
    if (req.body["email"] && req.body["password"] && req.body["userName"] && req.body["nickName"]) {
      registerUser(req.body);
    } else {
      console.log(req.body);
      console.log("Create Failed");
    }
  })
  // 이메일과 비밀번호가 동일한 객체에 대해서 삭제 진행
  .delete((req, res) => {
    deleteUserByEmailAndPassword(req.body["email"], req.body["password"]);
  })
  // 이메일과 패스워드가 일치하면 닉네임 업데이트 하게끔 설정
  // 해당 유저가 존재하는지 여부부터 파악 과정 추가 필요..
  .patch((req, res) => {
    updateNickNameByEmailAndPassword(req.body["email"], req.body["password"], req.body["nickname"]);
  });


export default router;
