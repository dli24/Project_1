const db = require('./models')

const project_list = [
    {
        name: "Project Testing 1",
        task: "task list Testing 1",
        date: 01/02/1992
    },
    {
        name: "Project Testing 2",
        task: "task list Testing 2",
        date: 01/02/1993
    },
    {
        name: "Project Testing 3",
        task: "task list Testing 3",
        date: 01/02/1991
    }
]

const task_list = [
    {
        name: "task list Testing 1",
        description: "description testing 1"
    },
    {
        name: "task list Testing 2",
        description: "description testing 2"
    },
    {
        name: "task list Testing 3",
        description: "description testing 3"
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
    

    db.Project.deleteMany({}, function(err, projects){
        console.log('removed all project');
        project_list.forEach(function (projectData){
            const project = new db.Project({
                name: projectData.name,
                date: projectData.date
            });
        db.Task.findOne({name: projectData.task}, function(err, foundTask){
                if (err){
                    console.log(err);
                    return;
                }
        project.task = foundTask;
        project.save(function(err, savedProject){
            if (err) {
                console.log(err);
            }
            console.log('saved' + savedProject)
          });
       });
     });
   });
 });
});
