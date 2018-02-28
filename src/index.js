const express = require('express');
const bodyParser = require('body-parser')

const api = express();
// uses public directory to serve
api.use(express.static(__dirname + '/public'));
// parse data you get and add to req.body parameter
api.use(bodyParser.json());

api.listen(3000, () => {
    console.log('API Running.')
});

api.post('/add', (req, res) => {
    console.log(req.body);
    res.send('It works!');
});