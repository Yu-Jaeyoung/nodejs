/*const express = require("express");
const User = require("../models/user");*/

import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render("sequelize", {users});
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/*module.exports = router;*/
export default router;