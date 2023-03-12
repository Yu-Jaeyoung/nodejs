import express from "express";
import {
  createInfo, readAllInfo, readInfoByAddress, readInfoByEmail,
  readInfoByName, updateAddressById, updateEmailById, updatePhoneNumberById, updateUserNameById, deleteById,
} from "../repository/index.js";
import {ObjectId} from "mongodb";


const router = express.Router();

router.route("/api/users")
  // 주소가 반드시 -si(시) or -gu(구) or -dong(동) 세 개중 1개는 포함할 것
  .post(async (req, res) => {
    if (req.body["userName"] && req.body["address"] && req.body["phoneNumber"] && req.body["email"]) {
      const checkAddress = req.body["address"];
      if (checkAddress.includes("-si")
        || checkAddress.includes("-gu")
        || checkAddress.includes("-dong")) {
        const newUser = await createInfo(req.body);
        res.status(201).send(newUser);
        console.log("Create Success");
      } else {
        console.log(req.body);
        res.status(406).send(req.body);
        console.log("올바르지 않은 주소 형식");
      }
    } else {
      res.status(406).send(req.body);
      console.log("Create Failed");
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
  // 갱신할 내용을 body로 받기
  // body로 받은 내용을 보고 갱신할 판단 진행
  // 동시에 바꿀수 없음. 패치 필요
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    const deleteUser = await deleteById(req.params.id);
    console.log(`${req.params.id}님이 삭제되었습니다`);
    res.status(201).send(deleteUser);

  });

export default router;