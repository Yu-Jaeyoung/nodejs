import express from "express";
import userRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.set("port", process.env.PORT || 8000);

app.use("/", userRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});