import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.query.name) {
    res.send("Hello, Greet!");
  } else {
    res.send(`Hello, ${req.query.name}!`);
  }
});

export default router;