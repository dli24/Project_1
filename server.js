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

// =============================Project Route================================

//Get all Project with Populate
app.get('/api/projects', (req, res)=>{
    db.Project.find()
    .populate('task')
    .exec((err, project)=>{
        if (err) return res.status(500);
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

app.post('/api/projects', (req,res)=>{
    const newProject = new db.Project({
        name: req.body.name,
        date: req.body.date,
        user: req.body.user,
        overview: req.body.overview
    });
        db.Project.create(newProject, (err,newProjects)=>{
            if(err)return (err)
            res.json(newProjects)
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
// =========================TASK ROUTE========================================
// Get all Task with Populate
app.get('/api/projects/:project_id/tasks', (req, res)=>{
    db.Task.find()
    // .populate('user')
    .exec((err, task)=>{
        if (err) return console.log(`error: ${err}`);
        res.json(task)
    });
});


//Get one task with Populate
app.get('/api/projects/:project_id/tasks/:id', (req,res)=>{
    db.Task.findById(req.params.id)
    // .populate('user')
    .exec((err, task)=>{
        if (err) return res.status(400);
        res.json(task)
    });
});


//create multiple task for one project
app.post('/api/projects/:project_id/tasks', (req,res)=>{
    const newTask = new db.Task({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        user: req.body.user
    });
    db.Project.findOne({_id: req.params.project_id},(err,project)=>{
        if (err) return res.json({error: err});   
        newTask.save((err, savedTask)=>{
            if (err) {return (err)};
            project.task.push(savedTask);
            project.save((err, savedProject)=>{
                res.json(savedTask);
            })          
        });
    });

});

// api/project/:project_id/taskarray
app.post('/api/projects/:project_id/taskarray' ,(req,res) => {
    console.log(req.body)
    db.Task.create(req.body.task, (err, newTasks) => {
      if (err) return res.json(err);
      db.Project.findById(req.params.project_id, (err, foundProject) => {
        if (err) return res.json(err);
        newTasks.forEach(task=> {
          foundProject.task.task.push(task);
        });
        foundProject.save((err, savedProject) => {
          if (err) return res.json(err);
          res.json(savedProject);
        });
      });
    });
  });




// update task with populate
app.put('/api/projects/:project_id/tasks', (req,res)=>{
    const taskToUpdate = req.body;
    taskToUpdate.forEach(task=>{
        console.log(task._id);
        db.Task.findByIdAndUpdate(task._id, task, (err, updatedTask)=>{
        if(err) return res.status(400);
        });
    });
    res.json(taskToUpdate)
});



//delete task with populate
app.delete('/api/projects/:project_id/tasks', (req,res)=>{
    const taskToDelete = req.body;
    taskToDelete.forEach(task=>{
    db.Task.findByIdAndRemove(task._id, (err, deletedTask)=>{
        if(err) return res.status(400);
    });
});
res.json(taskToDelete)
});

app.listen(PORT, ()=>console.log("port 3000 have linked!"))