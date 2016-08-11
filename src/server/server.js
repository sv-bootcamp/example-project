import express from 'express';

const app = express();

let port = 3000;


// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + '/src/client'));

app.get('/hello', (req, res) => {
    return res.send('Can u hear me??');
});



const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

