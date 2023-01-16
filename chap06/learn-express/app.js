import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});