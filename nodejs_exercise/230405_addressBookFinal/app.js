import express from 'express';
import router from './route/route.js';

const app = express();

app.use(express.json());
app.set("port", 8000);

app.use('/', router);

app.listen(app.get("port"),()=>{
    console.log(app.get("port"), "번에서 대기중");
});