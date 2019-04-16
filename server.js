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
    .populate('user')
    .exec((err, project)=>{
        if (err) return console.log(`error: ${err}`);
        res.json(project)
    });
});


//Get one project with Populate
app.get('/api/projects/:id', (req,res)=>{
    db.Project.findById(req.params.id)
    .populate('task')
    .populate('user')
    .exec((err, project)=>{
        if (err) return res.status(400);
        res.json(project)
    });
});


//create new projects and new task
app.post('/api/projects', (req,res)=>{  
    const newProject = new db.Project({
        name: req.body.name,
        date: req.body.date,
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
// =========================TASK ROUTE========================================
// Get all Task with Populate
app.get('/api/projects/:project_id/tasks', (req, res)=>{
    db.Task.find()
    .populate('project')
    .exec((err, task)=>{
        if (err) return console.log(`error: ${err}`);
        res.json(task)
    });
});


//Get one task with Populate
app.get('/api/projects/:project_id/tasks/:id', (req,res)=>{
    db.Task.findById(req.params.id)
    .populate('project')
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
        status: req.body.status
    });
    db.Project.findOne({_id: req.params.project_id},(err,project)=>{
        console.log(project);
        if (err) return res.json({error: err});   
        newTask.save((err, savedTask)=>{
            if (err) {return (err)};
            project.task.push(savedTask);
            project.save((err, savedProject)=>{
                res.json(savedTask);
            })
            
        });
    // }
    });
});


// update task with populate
app.put('/api/projects/:project_id/tasks/:id', (req,res)=>{
    db.Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('project')
    .exec((err, updateTask) =>{
        if (err) return res.status(400);
            res.json(updateTask)
    });
});



//delete task with populate
app.delete('/api/projects/:project_id/tasks/:id', (req,res)=>{
    db.Task.findByIdAndRemove(req.params.id)
    .populate('project')
    .exec((err, deletedTask)=>{
        if(err) return res.status(400);
        res.json(deletedTask)
    });
});





//===================================USER CRUD===========================================
//Get all Users
app.get('/api/projects/:project_id/users', (req, res)=>{
    db.User.find()
    .populate('project')
    .exec((err, user)=>{
        if (err) return console.log(`error: ${err}`);
        res.json(user)
    });
});

// Get one User
app.get('/api/projects/:project_id/users/:id', (req,res)=>{
    db.User.findById(req.params.id)
    .populate('project')
    .exec((err, user) => {
        if (err) return res.status(400).json({msg: 'User Id does not exist'})
        res.json(user);
    })



})

// create User

app.post('/api/projects/:project_id/users', (req, res)=>{
    const newUser = new db.User({
        name: req.body.name,
        color: req.body.color
    })
    db.Project.findOne({_id: req.params.project_id}, (err, project)=>{
        if (err) return res.json({error: err});
        newUser.save((err, savedUser)=>{
            if(err) {return (err)};
            project.user.push(savedUser);
            project.save((err, savedProject)=>{
                res.json(savedUser)
            })
        })
    })
})

// update user with populate
app.put('/api/projects/:project_id/users/:id', (req,res)=>{
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('project')
    .exec((err, updateUser) =>{
        if (err) return res.status(400);
            res.json(updateUser)
    });
});



//delete user with populate
app.delete('/api/projects/:project_id/users/:id', (req,res)=>{
    db.User.findByIdAndRemove(req.params.id)
    .populate('project')
    .exec((err, deletedUser)=>{
        if(err) return res.status(400);
        res.json(deletedUser)
    });
});








app.listen(PORT, ()=>console.log("port 3000 have linked!"))