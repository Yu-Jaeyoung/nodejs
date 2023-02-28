import express from "express";
import greetRouter from "./routes/greet.js";
import usersRouter from "./routes/users.js";

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(express.json());

app.use("/api/greet", greetRouter);
app.use("/api/users", usersRouter);


app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port stand by...");
});