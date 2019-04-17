console.log('sanity check')
let currentUser = 0;
let groupId = 100;

//hard-coded arrays:
const colorWheel = [{ color: '#6c757d', bootstrap: 'secondary' }, { color: '#dc3545', bootstrap: 'danger' }, { color: '#007bff', bootstrap: 'primary' }, { color: '#28a745', bootstrap: 'success' }, { color: '#17a2b8', bootstrap: 'info' }, { color: '#fd7e14', bootstrap: 'orange' }];


//soon-to-be dynamic arrays:
const users = [{ user_id: 0 },
    { name: 'zack', user_id: 1234 },
    { name: 'david', user_id: 2345 },
    { name: 'justin', user_id: 3456 }
]

const tasks = [{ title: "get drunk", description: "this is mainly a drinking activity but people also sometimes use other methods for getting alcohol into their bodies", task_id: 9990999, user: { name: 'david', user_id: 2345 } },
    { title: "do work", description: "just another description for another activity", task_id: 3344334 },
    { title: "go Global", description: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.", task_id: 1234567 },
    { title: "Allons-y", description: "There's something that doesn't make sense. Let's go and poke it with a stick. Brave heart, Clara. I once spent a hell of a long time trying to get a gobby Australian to Heathrow airport. Oh, I always rip out the last page of a book.", task_id: 932345 },
];




$('[data-toggle="tooltip"]').tooltip()
$('ul').on('click', '.popper', e => $(e.target).popover({ html: true }))



$('ul').on('shown.bs.popover', '.popper', e => {
    console.log('heard somehitngg')
    $('.popclose').on('click', () => {
        console.log($(e.target).popover('hide'))
    })
    $('.acceptTaskButton').on('click', event => {
        // e.preventDefault();
        $(e.target).popover('hide')
        taskId = $(event.target).attr('id');
        acceptTask(taskId)

    })
})


$('.idiotCheck').on('hover', () => console.log('you are dumb'));


$(function() {
    $("#taskList").sortable();
});



function layUsers(userArray) {
    console.log(userArray)
    userArray.forEach((user, index) => {
        if (user.name) {
            console.log(user)
            let $button = $(`<div class="toggle-back" style="background: white"><input class="toggler" id="toggle${index}" type="checkbox" checked data-toggle="toggle" data-index=${index} data-on="${user.name}" data-off="${user.name}" data-onstyle="outline-${colorWheel[index].bootstrap}" data-offstyle="${colorWheel[index].bootstrap}"></div>`);

            $('#userPills').append($button);
        }
    });
}


function layTasks(taskArray) {
    $('.task-list').empty();



    taskArray.forEach((task, index) => {
        console.log(task);
        const taskUser = task.user ? task.user.user_id : 0;
        console.log(taskUser)
        let $li = $(`<li class="list-item" id="listItem${index}" style="background-color: ${getColor(taskUser)}">`);
        let $button = $(`<button class="btn btn-${colorWheel[currentUser].bootstrap} popper" </button>`);

        console.log(task.task_id);
        $button.data({ toggle: 'popover', title: `<h5>${task.title}</h5><a class='btn popclose'>X</a>`, content: `<p>${task.description}</p> <a class='btn btn-secondary btn-lg editTaskButton'>Edit Task</a> <a class='btn btn-${colorWheel[currentUser].bootstrap} btn-lg acceptTaskButton' id="${task.task_id}">Accept</a>`, task_id: task.task_id });
        $li.append($button);
        // console.log($button);
        $li.append(`<h5>${task.title}</h5>`)

        $('.task-list').append($li);

    });
}






layTasks(tasks);
layUsers(users);


$('.toggler').change(function() {
    console.log('Toggle: ' + $(this).prop('checked'))
    console.log($(this).data('index'))

    toggleUser($(this))

    // if (!$(this).prop('checked')) {
    //     $('.toggler').not($(this)).bootstrapToggle('on');
    //     currentUser = $(this).data('index');
    // } else {
    //     let status = true;
    //     $('.toggler').each(function(toggler) {
    //         console.log(`Toggle${$(this).data('index')}` + $(this).prop('checked'))
    //         status = (status && $(this).prop('checked'));
    //         console.log($(this).data('index') + " :  " + status)
    //     })
    //     if (status) { currentUser = 0 }
    // }
    // layTasks(tasks)
})


function acceptTask(taskId) {
    console.log('trying to accept ' + taskId)
    const taskAss = tasks.find(task => task.task_id === Number(taskId));
    tasks.forEach(task => {
        console.log(`does ${task.task_id} even equal ${taskId} ??`)
        console.log(task.task_id === Number(taskId) ? "yes" : "no")
        console.log('task.task_id :  ' + typeof(task.task_id))
        console.log('taskId :  ' + typeof(taskId))

    });
    console.log(taskAss);
    console.log(taskAss.user)
    taskAss.user = users[currentUser];
    console.log(taskAss)
    layTasks(tasks);

}



function getColor(userId) {
    return colorWheel[users.findIndex(user => user.user_id == userId)].color
}


function toggleUser(user) {
    if (!user.prop('checked')) {
        $('.toggler').not(user).bootstrapToggle('on');
        currentUser = user.data('index');
    } else {
        let status = true;
        $('.toggler').each(function(toggler) {
            console.log(`Toggle${user.data('index')}` + user.prop('checked'))
            status = (status && user.prop('checked'));
            console.log(user.data('index') + " :  " + status)
        })
        if (status) { currentUser = 0 }
    }
    layTasks(tasks)
}




function createTask(title, description, status) {
    const newTask = {
        title,
        description,
        status,
        task_id: groupId
    }

    console.log(newTask)
    tasks.push(newTask)
    layTasks(tasks)
    groupId++
}


$('#newTask').on('click', () => {
    $('#newTaskModal').modal('toggle')
})


$('.task-edit').submit(function(event) {
    event.preventDefault();
    const taskName = $('#newTaskName').val();
    const taskDesc = $('#newTaskDescription').val();
    const taskStat = $('#newTaskStatus').val();
    createTask(taskName, taskDesc, taskStat);
    $('#newTaskModal').modal('hide');
});



$('#deleteTask').click(function(event) {

})