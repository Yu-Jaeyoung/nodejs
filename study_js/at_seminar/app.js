import express from "express";
import nunjucks from "nunjucks";
import * as path from "path";
import {fileURLToPath} from "url";

const app = express();

app.set("port", process.env.PORT || 3000);

app.set("view engine", "html");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, "js"))); // 간단한 예제를 위해 작성 -> static 파일로 묶음

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.get("/", (req, res, next) => {
  res.render("index", {title: "Express"});
});