import express from "express";
import {
  createInfo,
  readAllInfo,
  readInfoByAddress,
  readInfoByEmail,
  readInfoByName,
  updateAddressById,
  updateEmailById,
  updatePhoneNumberById,
  updateUserNameById,
  deleteById,
  readInfoById,
} from "../repository/index.js";
import {ObjectId} from "mongodb";
import jwt from "jsonwebtoken";

// post 처리할 때 jwt 토큰까지 생성할 수있게 처리
// 중복 이메일이나 정보 등은 추후 처리 예정
// 일단 jwt를 만드는 것을 기준으로...

const router = express.Router();

router.route("/api/users")
  // 주소가 반드시 -si(시) or -gu(구) or -dong(동) 세 개중 1개는 포함할 것
  // 전화번호에 반드시 010- 는 포함될 것 (임시)
  // 이메일에 반드시 @는 포함될 것 (임시)

  .post(async (req, res) => {
    if (req.body["userName"] && req.body["address"] && req.body["phoneNumber"] && req.body["email"]) {
      const checkAddress = req.body["address"];
      const checkPhoneNumber = req.body["phoneNumber"];
      const checkEmail = req.body["email"];
      if (checkAddress.includes("-si") || checkAddress.includes("-gu") || checkAddress.includes("-dong")) {
        if (checkPhoneNumber.includes("010-")) {
          if (checkEmail.includes("@")) {
            await createInfo(req.body);
            const payload = { // Json Web Token 으로 변환할 데이터 정보
              user: { // phoneNumber와 address는 민감한 정보로 판단하여 넣지 않아봄
                id: req.body["userName"],
                // address : req.body["address"],
                // phoneNumber: req.body["phoneNumber"],
                email: req.body["email"],
              },
            };
            jwt.sign(
              payload, // 변환할 데이터
              "addressBook", // secret key 값
              {expiresIn: "5m"}, // token의 유효시간 2분
              (err, token) => {
                if (err) throw err;
                res.status(201).send({token});
                console.log("Create Success");
              },
            );
          } else {
            console.log(req.body);
            res.status(406).send(req.body);
            console.log("올바르지 않은 이메일 형식");
          }
        } else {
          console.log(req.body);
          res.status(406).send(req.body);
          console.log("올바르지 않은 전화번호 형식");
        }
      } else {
        console.log(req.body);
        res.status(406).send(req.body);
        console.log("올바르지 않은 주소 형식");
      }
    } else {
      res.status(406).send(req.body);
      console.log("올바르지 않은 정보");
    }
  })
  .get(async (req, res) => {
    if (req.query.userName) {
      const foundUser = await readInfoByName(req.query.userName);
      if (foundUser === undefined) {
        res.status(406).send(`${JSON.stringify(foundUser)}`);
        console.log("Not Found");
      } else {
        res.status(200).send(`${JSON.stringify(foundUser)}`);
        console.log("Found");
        /*
        await foundUserCheck(foundUser);
        */
      }
    } else if (req.query.email) {
      const foundUser = await readInfoByEmail(req.query.email);
      if (foundUser === undefined) {
        res.status(406).send(`${JSON.stringify(foundUser)}`);
        console.log("Not Found");
      } else {
        res.status(200).send(`${JSON.stringify(foundUser)}`);
        console.log("Found");
      }
    } else if (req.query.address) {
      const foundUser = await readInfoByAddress(req.query.address);
      if (foundUser === undefined) {
        res.status(406).send(`${JSON.stringify(foundUser)}`);
        console.log("Not Found");
      } else {
        res.status(200).send(`${JSON.stringify(foundUser)}`);
        console.log("Found");
      }
    } else {
      const foundUser = await readAllInfo();
      if (foundUser === undefined) {
        res.status(406).send(`${JSON.stringify(foundUser)}`);
        console.log("Not Found");
      } else {
        res.status(200).send(`${JSON.stringify(foundUser)}`);
        console.log("Found");
      }
    }
  });

router.route("/api/users/:id")
  // 갱신할 내용을 body로 받고, body로 받은 내용을 보고 갱신할 판단 진행
  // 동시에 바꿀수 없는 상태 수정 필요
  .patch(async (req, res) => {
    // jwt 토큰이 유효한 경우, patch를 진행할 수 있도록 수정 진행
    const token = req.headers["authorization"];
    // console.log(token);

    if (token) {
      jwt.verify(token, "addressBook", (err, decoded) => {
        if (err) {
          res.status(404);
        }
      });
      // userName 갱신
      if (req.body["userName"]) {
        const UserId = new ObjectId(req.params.id);
        const patchUser = await updateUserNameById(UserId, req.body["userName"]);
        res.status(200).send(`${JSON.stringify(patchUser)}`);
      } else if (req.body["address"]) {
        // address 갱신
        if (req.body["address"].includes("-si")
          || req.body["address"].includes("-gu")
          || req.body["address"].includes("-dong")) {
          const newUser = await createInfo(req.body);
          res.status(201).send(newUser);
          console.log("Create Success");
        } else {
          console.log(req.body);
          res.status(406).send(req.body);
          console.log("올바르지 않은 주소 형식");
        }
        const UserId = new ObjectId(req.params.id);
        const patchUser = await updateAddressById(UserId, req.body["address"]);
        res.status(200).send(`${JSON.stringify(patchUser)}`);
      } else if (req.body["phoneNumber"]) {
        // phoneNumber 갱신
        const UserId = new ObjectId(req.params.id);
        const patchUser = await updatePhoneNumberById(UserId, req.body["phoneNumber"]);
        res.status(200).send(`${JSON.stringify(patchUser)}`);
      } else if (req.body["email"]) {
        // email 갱신
        const UserId = new ObjectId(req.params.id);
        const patchUser = await updateEmailById(UserId, req.body["email"]);
        res.status(200).send(`${JSON.stringify(patchUser)}`);
      } else {
        res.status(406).send(`${JSON.stringify(req.body)}`);
        console.log("Path Failed");
      }
    } else {
      res.status(404);
    }
  })
  .delete(async (req, res) => {
    const token = req.headers["authorization"];
    // console.log(token);
    if (token) {
      jwt.verify(token, "addressBook", (err, decoded) => {
        if (err) {
          res.status(404);
        }
      });
      const deleteUser = await deleteById(req.params.id);
      console.log(`${req.params.id}님이 삭제되었습니다`);
      res.status(201).send(deleteUser);
    }
  });
export default router;