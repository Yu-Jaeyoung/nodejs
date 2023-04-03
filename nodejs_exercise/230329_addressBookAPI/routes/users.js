import express from "express";
import {signUpValidation} from "../validation/signup.js";
import {
  addAddressInfo,
  checkVerifiedUser,
  createUser,
  deleteAddressInfo,
  getAddressInfo,
} from "../repository/index.js";

const router = express.Router();

router.route("/api/user/signup")
  .post(async (req, res) => {
    const verified = await signUpValidation(req.body);
    const check = verified.id && verified.password && verified.username;
    if (check) {
      // req.body 객체에 master라는 프로퍼티를 동적으로 할당
      req.body.master = "O";
      await createUser(req.body);
      res.json({message: "Sign Up Verified !!!"}).status(201);
    } else {

      if (!verified.username) {
        res.json({message: "Sign Up Failed ! ! Check your name"}).status(400);
      }

      if (!verified.id) {
        res.json({message: "Sign Up Failed ! ! Check your Id"}).status(400);
      }

      if (!verified.password) {
        res.json({message: "Sign Up Failed ! ! Check your password"}).status(400);
      }
    }
  });

router.route("/api/user/signin")
  .post(async (req, res) => {
    const user = {};
    user.id = req.query.id;
    user.password = req.query.password;

    const verified = await checkVerifiedUser(user);

    if (verified === undefined) {
      res.json({message: "Sign in Failed ! !"}).status(404);
    } else {
      await addAddressInfo(req.body);
      res.json({message: "completed ! !"}).status(201);
    }
  })
  // get도 전체 정보를 가져오고 있어서, 어떤 정보를 받아서 출력할 것인지 각각 선언이 필요.
  .get(async (req, res) => {
    const user = {};
    user.id = req.query.id;
    user.password = req.query.password;

    const verified = await checkVerifiedUser(user);

    if (verified === undefined) {
      res.json({message: "Sign in Failed ! !"}).status(404);
    } else {
      const foundAddress = await getAddressInfo();
      res.send(foundAddress).status(201);
    }
  });
  // patch : 어떤 정보를 어떻게 업데이트 할 것인가에 대해서 각각 다 선언이 필요한 상황...
  // delete : 어떤 정보를 어떻게 삭제할 것인가에 대해서 각각 다 선언이 필요한 상황...
  /*
  .patch(async (req, res) => {
    const user = {};
    user.id = req.query.id;
    user.password = req.query.password;

    const verified = await checkVerifiedUser(user);

    if (verified === undefined) {
      res.json({message: "Sign in Failed ! !"}).status(404);
    } else {
      const foundAddress = await updateAddressInfo(req.body);
      res.send(foundAddress).status(201);
    }
  })
  .delete(async (req, res) => {
    const user = {};
    user.id = req.query.id;
    user.password = req.query.password;

    const verified = await checkVerifiedUser(user);

    if (verified === undefined) {
      res.json({message: "Sign in Failed ! !"}).status(404);
    } else {
      const foundAddress = await deleteAddressInfo(req.body);
      res.send(foundAddress).status(201);
    }
  })
  */

router.route("/api//");
export default router;