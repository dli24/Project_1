console.log('sanity check')
// let projectId = '5cb97a8fb990dca6268253dc'
const PROJECT_ID = location.href.split('/').pop();
let probject;
const URL = `/api/projects/${PROJECT_ID}`
let currentUser = 0;
let screen = 'all';

//hard-coded arrays:
const colorWheel = [{ color: '#6c757d', bootstrap: 'secondary' }, { color: '#dc3545', bootstrap: 'danger' }, { color: '#007bff', bootstrap: 'primary' }, { color: '#28a745', bootstrap: 'success' }, { color: '#17a2b8', bootstrap: 'info' }, { color: '#fd7e14', bootstrap: 'orange' }];

//soon-to-be dynamic arrays:
const taskAssigments = [];
const completeTasks = [];
const stretchTasks = [];
const partnerFuckUps = [];

const users = ['no one']
let tasks = [];

//event listeners

$("#taskList").sortable(); //allows tasks to be sorted by dragging

//listens for user "sign-ins" aka 'toggle changes'
$('#userPills').on('change', '.toggler', function() {
    console.log(`Toggle: ${$(this).prop('checked')}`)
    console.log($(this).data('index'))
    toggleUser($(this))
    saveOrder()
    layTasks(tasks)
})

//create new task button 
$('#newTask').on('click', () => {
    $('#newTaskModal').modal('toggle')
})
//tooltips and popovers and modals oh my !
$('[data-toggle="tooltip"]').tooltip()
$('ul').on('click', '.popper', e => $(e.target).popover({ html: true }))
$('#newTaskModal').on('hide.bs.modal', resetModal) // resets the modal on close 


//handles buttons in popover footer
$('ul').on('shown.bs.popover', '.popper', e => {
    console.log('heard somehitngg')
    $('.popclose').on('click', () => {
        console.log($(e.target).popover('hide'))
    })
    $('.pop-help').on('click', event => {
        $(e.target).popover('hide')
        const taskId = $(event.target).attr('id');
        if($(event.target).text() === 'Accept'){
            acceptTask(taskId)
        }else if($(event.target).text() === 'Complete!'){
            completeTask(taskId)
        }else{
            editTaskModal(taskId)
        }
    })
})

//modal for task creation and update
$('.task-edit').submit(function(event) {
    event.preventDefault();
    const button = $(event.target);
    console.log(button);
    const taskName = $('#newTaskName').val();
    const taskDesc = $('#newTaskDescription').val();
    const taskStat = $('#newTaskStatus').val();

    if ($('.task-edit').data('task')) { //sorts new info towards create or update functions
        console.log($('.task-edit').data('task'))
        editTask(taskName, taskDesc, taskStat, $('.task-edit').data('task'));
    } else {
        createTask(taskName, taskDesc, taskStat);
    }
    $('#newTaskModal').modal('hide');
});

//THIS NEEDS WORK
$('#hideNonAssigned').on('click', () => {
    // saveOrder();
    // if(screen === 'all'){
    // const myTasks = [];
    // tasks.forEach(task => {if(task.user === currentUser){myTasks.push(task)}})
    // layTasks(myTasks)
    // screen = 'yours';
    // // console.log($('#hideNonAssigned').text())
    // $('#hideNonAssigned').text('show all tasks')
    // }else{
    //     layTasks(tasks);
    //     $('#hideNonAssigned').text('your tasks only');
    //     screen = 'all';
    // }
    alert('really unchill move during presentation dude')
})


function layUsers(userArray) {
    // console.log(userArray)
    userArray.forEach((user, index) => {
        if (index > 0) {
            console.log(user)
            let $button = $(`<input class="toggler" id="toggle${index}" type="checkbox" checked data-toggle="toggle" data-index=${index} data-on="${user}" data-off="${user}" data-onstyle="outline-${colorWheel[index].bootstrap}" data-offstyle="${colorWheel[index].bootstrap}">`);
            $('#userPills').append($button);
        }
    });
}

function layTasks(taskArray) {
    $('.task-list').empty();
    taskArray.forEach((task, index) => {
        if (task) {
            console.log(task);
            let taskUser = task.status === 'Assigned' ? task.user : 0;
            let fafa = task.status === 'Assigned' ? '-' : '-circle-';
            let colores = task.status === 'Assigned' ? 'black' : colorWheel[currentUser].color;
            let acceptButton = task.status === 'Assigned' ? 'Complete!' : 'Accept';
            let acceptButtonColor = task.status === 'Assigned' ? taskUser : currentUser;

            let $li = $(`<li class="list-item" id="listItem${index}" style="background-color: ${colorWheel[taskUser].color}">`);
            let $button = $(`<i class="fas fa-chevron${fafa}right unassigned popper" style="color:${colores}"></i>`);

            console.log(task._id);
            $button.data({ toggle: 'popover', title: `<h5>${task.name}</h5><button type="button" class="close btn-warning" data-dismiss="popover" aria-label="Close">`, content: `<p>${task.description}</p> <a class='btn btn-secondary btn-lg editTaskButton pop-help' id='${task._id}'>Edit Task</a> <a class='btn btn-${colorWheel[acceptButtonColor].bootstrap} btn-lg acceptTaskButton pop-help accept' id="${task._id}">${acceptButton}</a>`, task_id: task._id });
            $li.append($button);
            $li.append(`<h5>${task.name}</h5>`)
            $('.task-list').append($li);
        }
    });
}

//handles task assignment
function acceptTask(taskId) {
    console.log(taskId)
    // console.log('trying to accept ' + taskId)
    const taskAss = tasks.find(task => task._id === taskId);
    taskAss.user = currentUser;
    taskAss.status = 'Assigned';
    editTask(taskAss.name, taskAss.description, 'Assigned', taskId, currentUser)
}

//reassigns and hides completed tasks
function completeTask(taskId) {
    const toComplete = tasks.splice(tasks.findIndex(task => task._id === taskId), 1)[0];
    toComplete.status = 'Complete';
    console.log(toComplete)
    completeTasks.push(toComplete);
    editTask(toComplete.name, toComplete.description, 'Complete', taskId, toComplete.user)
}



//on user sign-in, signs out other users and changes popover button color
function toggleUser(user) {
    if (!user.prop('checked')) {
        $('.toggler').not(user).bootstrapToggle('on');
        currentUser = user.data('index');
    } else {
        let status = true;
        $('.toggler').each(function(toggler) {
            console.log(`Toggle${user.data('index')} ${user.prop('checked')}`)
            status = (status && user.prop('checked'));
            console.log(user.data('index') + " :  " + status)
        })
        if (status) { currentUser = 0 }
    }
    saveOrder();
    layTasks(tasks)
}

//rewrites POST modal to accept changes on existing task
function editTaskModal(taskId) {
    console.log(taskId);
    const taskEdit = tasks.find(task => task._id === taskId);
    $('#newTaskModalLabel').text('Edit Task');
    $('#newTaskSubmit').text('Do the Edit!');
    $('#newTaskName').val(taskEdit.name);
    $('#newTaskDescription').val(taskEdit.description);
    $('#newTaskStatus').val(taskEdit.status)
    $('.task-edit').data('task', taskId);
    $('#newTaskModal').modal('toggle');
}






function createTask(name, description, status) {
    const newTask = {
        name,
        description,
        status,
    }
    $.ajax({
        method: 'POST',
        url: `${URL}/tasks`,
        data: newTask,
        error: err => console.log(err),
        success: handleTaskCreation
    })

}








$('#deleteTask').click(function(event) {
    console.log('yeahhhhhhhhh')
    const task = $('.task-edit');
    console.log(task)
    if (task.data('task')) {
        num = task.data('task');
        tasks.splice(tasks.findIndex(task => task._id === num), 1)[0]; //updates DOM
        $.ajax({
                method: 'DELETE',
                url: `${URL}/tasks/${num}`,
                error: err => console.log(err),
                success: () => console.log("deleted :)")
        }) 
        saveOrder();
        layTasks(tasks);
    }
    $('#newTaskModal').modal('hide');
})

function resetModal() {
    console.log('resetting')
    $('#newTaskModalLabel').text('New Task');
    $('#newTaskSubmit').text('Create !');
    $('#newTaskName').val('');
    $('#newTaskDescription').val('');
    $('#newTaskStatus').val('Unassigned');
    $('.task-edit').removeData('task');
    // $('#newTaskSubmit').removeData('task');
}

function editTask(name, description, status,  taskId, user) {
    

    $.ajax({
        method: 'PUT',
        url: `${URL}/tasks/${taskId}`,
        data: {
            name,
            description, 
            status,
            user
        },
        error: err=>console.log(err),
        success: data=>console.log(data)
    })
    const renewedTask = tasks.find(task => task._id === taskId);
    if (renewedTask){
    renewedTask.name = name;
    renewedTask.description = description;
    renewedTask.status = status;
    }
    saveOrder()
    layTasks(tasks)
}


const getForNow = {
    method: 'GET',
    url: URL,
    error: err => console.log(err),
    success: handleSuccess
}




function handleSuccess(data) {
    console.log(data);
    data.user.forEach(user => users.push(user));
    data.task.forEach(task => task.status && getArray(task).push(task));
    probject = {
        overview: data.overview || {},
        dueDate: data.date
    }
    layUsers(users);
    layTasks(tasks);
}

function getArray(task) {
    switch (task.status) {
        case "Stretch":
            return stretchTasks;
            break;
        case "Complete":
            return completeTasks;
            break;
        case "Unassigned":
        case "Assigned":
            return tasks;
            break;
        default:
        console.log("status error! try typing: 'partnerFuckUps' into the console");
            return partnerFuckUps;
    }
}

function handleTaskCreation(data) {
    console.log('you did it!')
    console.log(data)
    getArray(data).push(data)
    console.log(tasks)
    layTasks(tasks)

}

// function saveEdits(toSave, taskId) {
//     $.ajax({
//         method: 'PUT',
//         url: `${URL}/tasks/${taskId}`,
//         data: toSave,
//         error: err => err,
//         success: () => console.log('worked')
//     })
// }






//gets the dang project
$.ajax(getForNow)


//saves order of tasks in DOM but not DB
function saveOrder() {
    const newTasks = [];
    const sorteds = $('.task-list').sortable('toArray');
    sorteds.forEach(item => newTasks.push(tasks[Number(item.split('m').pop())]))
    tasks = newTasks;
}