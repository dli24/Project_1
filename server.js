const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('views/index.html', { root: __dirname });
});




app.listen(PORT, ()=>console.log("port 3000 have linked!"))