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

app.get('/responsibilities', (req, res) => {
	res.sendFile('views/responsibilities.html', { root: __dirname });
});


//Get all Project with Populate
app.get('/api/projects', (req, res)=>{
    db.Project.find()
    .populate('task')
    .exec((err, project)=>{
        if (err) return console.log(`error: ${err}`);
        res.json(project)
    });
});

//Get one project with Populate
app.get('/api/projects/:id', (req,res)=>{
    db.Project.findById(req.params.id)
    .populate('task')
    .exec((err, project)=>{
        if (err) return res.status(400);
        res.json(project)
    });
});

//create new projects and new task
app.post('/api/projects', (req,res)=>{
    const newProject = new db.Project({
        name: req.body.name,
        date: req.body.date
    });
db.Task.findOne({name: req.body.task}, (err,task)=>{
    if (err) return res.json({error: err});
    if (task === null) {
        db.Task.create({name: req.body.task}, (err, newTask)=>{
            if (err) return console.log("error existssss");
            newProject.task = newTask
            newProject.save((err, savedProject)=>{
                if (err) return (err);
                res.json(savedProject)
            });
        })
    } else {
        newProject.task = task;
        newProject.save((err, savedProject)=>{
            if (err) return (err)
            res.json(savedProject);
      });
    };
  });
});






//update project with populate
app.put('/api/projects/:id', (req,res)=>{
    db.Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('task')
    .exec((err, updateProject) =>{
        if (err) return res.status(400);
            res.json(updateProject)
    });
});

//delete project with populate
app.delete('/api/projects/:id', (req,res)=>{
    db.Project.findByIdAndRemove(req.params.id)
    .populate('task')
    .exec((err, deletedProject)=>{
        if(err) return res.status(400);
        res.json(deletedProject)
    });
});




app.listen(PORT, ()=>console.log("port 3000 have linked!"))