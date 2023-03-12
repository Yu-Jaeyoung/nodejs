import express from "express";
import {createInfo, readAllInfo, readInfoByAddress, readInfoByEmail, readInfoByName} from "../repository/index.js";

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

export default router;