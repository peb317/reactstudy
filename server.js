const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send([{
        id: 1,
        image: "https://placeimg.com/64/64/any",
        name: "백인천1",
        birthday: "05.13",
        gender: "남자",
        job: "무직",
      },{
        id: 2,
        image: "https://placeimg.com/64/64/any",
        name: "백인천2",
        birthday: "05.13",
        gender: "남자",
        job: "무직",
      },{
        id: 3,
        image: "https://placeimg.com/64/64/any",
        name: "백인천3",
        birthday: "05.13",
        gender: "남자",
        job: "무직",
      }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));