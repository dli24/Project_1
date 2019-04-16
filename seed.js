const db = require('./models')

const project_list = [
    {
        name: "Project Testing 1",
        task: "task list Testing 1",
        date: '1992-05-12'
    },
    {
        name: "Project Testing 2",
        task: "task list Testing 2",
        date: '1992-12-12'
    },
    {
        name: "Project Testing 3",
        task: "task list Testing 3",
        date: '1993-12-12'
    }
]

const task_list = [
    {
        name: "task list Testing 1",
        description: "description testing 1",
        status: false
    },
    {
        name: "task list Testing 2",
        description: "description testing 2",
        status: true
    },
    {
        name: "task list Testing 3",
        description: "description testing 3",
        status: false
    }
]

const user_list = [
    {
        name: "person number one",
        color: "red"
    },
    {
        name: "person number two",
        color: "green"
    },
    {
        name: "person number three",
        color: "yellow"
    }
]






db.Task.deleteMany({}, function(err, tasks){
    console.log('removed all task')
    db.Task.create(task_list, function(err, tasks){
        if(err){
            console.log(err);
            return;
        }
        console.log("create", tasks, "tasks")
        console.log("create", tasks.length, "task")
    

    db.User.deleteMany({}, function(err, deletedUsers) {
        if (err) return console.log(err);
        db.User.create({user_list}, function (err, newUser) {
            if (err) return console.log(err);

            db.Project.deleteMany({}, function(err, projects){
                console.log('removed all project');
                project_list.forEach(function (projectData){
                    const project = new db.Project({
                        name: projectData.name,
                        date: projectData.date,
                    });

                db.Task.findOne({name: projectData.task}, function(err, foundTask){
                        if (err){
                            console.log(err);
                            return;
                        }

                project.task = foundTask;
                foundTask.user = newUser;
                project.user.push(newUser);
                project.save(function(err, savedProject){
                    if (err) {
                        console.log(err);
                    }
                    console.log('saved' + savedProject)
                  });
               });
             });
           });
        })
    })
 });
});
