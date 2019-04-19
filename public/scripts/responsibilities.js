console.log('sanity check')
let projectId = 'duuuude+the+PROJECTID'
const URL = `/api/projects/${projectId}`
let currentUser = 0;
let idCounter = 100;


function groupId() {
    return '' + idCounter
}


//hard-coded arrays:
const colorWheel = [{ color: '#6c757d', bootstrap: 'secondary' }, { color: '#dc3545', bootstrap: 'danger' }, { color: '#007bff', bootstrap: 'primary' }, { color: '#28a745', bootstrap: 'success' }, { color: '#17a2b8', bootstrap: 'info' }, { color: '#fd7e14', bootstrap: 'orange' }];


//soon-to-be dynamic arrays:
const deletedTasks = [];
const users = [{ user_id: 0 },
    { name: 'zack', user_id: 1234 },
    { name: 'david', user_id: 2345 },
    { name: 'justin', user_id: 3456 }
];

const tasks = [{ title: "get drunk", description: "this is mainly a drinking activity but people also sometimes use other methods for getting alcohol into their bodies", task_id: '9990999', user: { name: 'david', user_id: 2345 }, status: 'assigned' },
    { title: "do work", description: "just another description for another activity", task_id: '3344334', status: 'unassigned' },
    { title: "go Global", description: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.", task_id: '1234567', status: 'unassigned' },
    { title: "Allons-y", description: "There's something that doesn't make sense. Let's go and poke it with a stick. Brave heart, Clara. I once spent a hell of a long time trying to get a gobby Australian to Heathrow airport. Oh, I always rip out the last page of a book.", task_id: '932345', status: 'flex' },
];



function callDavid(method, data, url = URL) {
    const apiCall = {
        method: "GET",
        url,
        data,
        dataType: "dataType",
        success: handleSuccess,
        error: handleError
    };

    function handleSuccess(data) { console.log(data) }

    function handleError(error) { console.log(error) }

    $.ajax(apiCall);
}


const practice = {
    method: 'GET',
    url: URL,
    success: () => console.log('success'),
    error: () => console.log('error')
};


let cooler = "yeah cool"

function noCool(type, data, url = cooler) {
    const obj = {
        type,
        url,
        data

    }
    console.log(obj)
}




$('ul').on('shown.bs.popover', '.popper', e => {
    console.log('heard somehitngg')
    $('.popclose').on('click', () => {
        console.log($(e.target).popover('hide'))
    })
    $('.pop-help').on('click', event => {
        $(e.target).popover('hide')
        console.log(event.target)
        const taskId = $(event.target).attr('id');
        console.log('task id is  ' + taskId)
        $(event.target).hasClass('accept') ? acceptTask(taskId) : editTaskModal(taskId);
    })

})


$('.idiotCheck').on('hover', () => console.log('you are dumb'));


// $(function() {
$("#taskList").sortable();
// });



function layUsers(userArray) {
    console.log(userArray)
    userArray.forEach((user, index) => {
        if (user.name) {
            console.log(user)
            let $button = $(`<input class="toggler" id="toggle${index}" type="checkbox" checked data-toggle="toggle" data-index=${index} data-on="${user.name}" data-off="${user.name}" data-onstyle="outline-${colorWheel[index].bootstrap}" data-offstyle="${colorWheel[index].bootstrap}">`);
            // let $button = $(`<div class="toggle-back" style="background: white"><input class="toggler" id="toggle${index}" type="checkbox" checked data-toggle="toggle" data-index=${index} data-on="${user.name}" data-off="${user.name}" data-onstyle="outline-${colorWheel[index].bootstrap}" data-offstyle="${colorWheel[index].bootstrap}"></div>`);

            $('#userPills').append($button);
        }
    });
}

$('#hideNonAssigned').on('click', () => {
    // console.log(tasks.filter(task => tasks.user === users[currentUser]))
    tasks.forEach(task => {
        console.log(tasks.user.name || false)
        console.log(users[currentUser].name || false)


    });
    // layTasks(tasks.filter(task => tasks.user.name || false === users[currentUser].name))
})


function layTasks(taskArray) {
    $('.task-list').empty();



    taskArray.forEach((task, index) => {
        console.log(task);
        const taskUser = task.user ? task.user.user_id : 0;
        const fafa = task.user ? '-' : '-circle-';
        const colores = task.user ? 'black' : colorWheel[currentUser].color;
        console.log(taskUser)
        let $li = $(`<li class="list-item" id="listItem${index}" style="background-color: ${getColor(taskUser)}">`);
        let $button = $(`<i class="fas fa-chevron${fafa}right unassigned popper" style="color:${colores}"></i>`);
        // let $button = $(`<button class="btn btn-${colorWheel[currentUser].bootstrap} popper"></button>`);

        console.log(task.task_id);
        $button.data({ toggle: 'popover', title: `<h5>${task.title}</h5><button type="button" class="close btn-warning" data-dismiss="popover" aria-label="Close">`, content: `<p>${task.description}</p> <a class='btn btn-secondary btn-lg editTaskButton pop-help' id='${task.task_id}'>Edit Task</a> <a class='btn btn-${colorWheel[currentUser].bootstrap} btn-lg acceptTaskButton pop-help accept' id="${task.task_id}">Accept</a>`, task_id: task.task_id });
        // $button.data({ toggle: 'popover', title: `<h5>${task.title}</h5><a class='btn popclose'>X</a>`, content: `<p>${task.description}</p> <a class='btn btn-secondary btn-lg editTaskButton pop-help' id='${task.task_id}'>Edit Task</a> <a class='btn btn-${colorWheel[currentUser].bootstrap} btn-lg acceptTaskButton pop-help accept' id="${task.task_id}">Accept</a>`, task_id: task.task_id });
        $li.append($button);
        // console.log($button);
        $li.append(`<h5>${task.title}</h5>`)

        $('.task-list').append($li);

    });
}

'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'




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
    const taskAss = tasks.find(task => task.task_id === taskId);
    tasks.forEach(task => {
        console.log(`does ${task.task_id} even equal ${taskId} ??`)
        console.log(task.task_id === taskId ? "yes" : "no")
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


function editTaskModal(taskId) {
    console.log(taskId);
    const taskEdit = tasks.find(task => task.task_id === taskId);
    // console.log(task_id);
    $('#newTaskModalLabel').text('Edit Task');
    $('#newTaskSubmit').text('Do the Edit!');
    $('#newTaskName').val(taskEdit.title);
    $('#newTaskDescription').val(taskEdit.description);
    $('#newTaskStatus').val(taskEdit.status)
    $('.task-edit').data('task', taskId);
    // $('#newTaskSubmit').data('task', taskId);
    $('#newTaskModal').modal('toggle');
}






function createTask(title, description, status) {
    const newTask = {
        title,
        description,
        status,
        task_id: groupId()
    }

    console.log(newTask)
    tasks.push(newTask)
    layTasks(tasks)
    idCounter++
}


$('#newTask').on('click', () => {
    $('#newTaskModal').modal('toggle')
})


$('.task-edit').submit(function(event) {
    event.preventDefault();
    const button = $(event.target);
    console.log(button);
    const taskName = $('#newTaskName').val();
    const taskDesc = $('#newTaskDescription').val();
    const taskStat = $('#newTaskStatus').val();

    if ($('.task-edit').data('task')) {
        // console.log($('.task-edit').data('task'))
        console.log($('.task-edit').data('task'))
        editTask(taskName, taskDesc, taskStat, $('.task-edit').data('task'));
    } else {
        createTask(taskName, taskDesc, taskStat);
    }


    // createTask(taskName, taskDesc, taskStat);
    $('#newTaskModal').modal('hide');
});



$('#deleteTask').click(function(event) {
    console.log('yeahhhhhhhhh')
    const task = $('.task-edit');
    console.log(task)
    if (task.data('task')) {
        num = task.data('task');
        console.log(num);
        deletedTasks.push(tasks.splice(tasks.findIndex(task => task.task_id === Number(num)), 1)[0]);
        layTasks(tasks);
    }
    $('#newTaskModal').modal('hide');
})



$('#newTaskModal').on('hide.bs.modal', resetModal)



function resetModal() {
    console.log('resetting')
    $('#newTaskModalLabel').text('New Task');
    $('#newTaskSubmit').text('Create !');
    $('#newTaskName').val('');
    $('#newTaskDescription').val('');
    $('#newTaskStatus').val('Pending');
    $('.task-edit').removeData('task');
    // $('#newTaskSubmit').removeData('task');
}

function editTask(title, description, status, taskId) {
    console.log(tasks)
    const renewedTask = tasks.find(task => task.task_id === Number(taskId));
    renewedTask.title = title;
    renewedTask.description = description;
    renewedTask.status = status;
    console.log(renewedTask)
    console.log(tasks)
        // tasks.push(renewedTask)
    layTasks(tasks)
}


// $('#editTaskButton').on('click', editTaskModal)

$('[data-toggle="tooltip"]').tooltip()
$('ul').on('click', '.popper', e => $(e.target).popover({ html: true }))