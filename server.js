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

//Get all Project with Populate
app.get('/api/projects', (req, res)=>{
    db.Project.find()
    .populate('task_list')
    .exec((err, project)=>{
        if (err) return console.log(`error: ${err}`);
        res.json(project)
    });
});

//Get one project with Populate
app.get('/api/projects/:id', (req,res)=>{
    db.Project.findById(req.params.id)
    .populate('task_list')
    .exec((err, project)=>{
        if (err) return res.status(400);
        res.json(project)
    });
});







app.listen(PORT, ()=>console.log("port 3000 have linked!"))