// let currentUser = { name: 'zack', color: 'red' };

let currentUser = 0;



const users = [{},
    { name: 'zack', id: 1234 },
    { name: 'david', id: 2345 },
    { name: 'justin', id: 3456 }
]



const colorWheel = [{ color: 'grey', bootstrap: 'secondary' }, { color: 'red', bootstrap: 'danger' }, { color: 'blue', bootstrap: 'primary' }, { color: 'green', bootstrap: 'success' }, { color: 'teal', bootstrap: 'info' }, { color: 'orange', greyed: 'palegoldenrod', text: 'black' }];


console.log('sanity check')

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})


$('ul').on('click', '.popper', e => $(e.target).popover({ html: true }))

$('ul').on('shown.bs.popover', '.popper', e => {
    console.log('heard somehitngg')
    $('.popclose').on('click', () => {
        console.log($(e.target).popover('hide'))

    })
})


$('.idiotCheck').on('hover', () => console.log('you are dumb'));


$(function() {
    $("#taskList").sortable();
});


$('body').on('click', '.acceptTaskButton', e => {
    event.preventDefault();
    console.log(event.target);
    console.log($(event.target).attr('id'))
})


const tasks = [{ title: "get drunk", description: "this is mainly a drinking activity but people also sometimes use other methods for getting alcohol into their bodies", task_id: 9990999, user: '' },
    { title: "do work", description: "just another description for another activity", task_id: 3344334, user: '' },
    { title: "go Global", description: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.", task_id: 1234567, user: '' },
    { title: "Allons-y", description: "There's something that doesn't make sense. Let's go and poke it with a stick. Brave heart, Clara. I once spent a hell of a long time trying to get a gobby Australian to Heathrow airport. Oh, I always rip out the last page of a book.", task_id: 932345, user: '' },
];

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
    // const userColor = currentUser ? colorWheel[currentUser].bootstrap : 'secondary';
    // console.log(currentUser + '  yeah  ' + userColor)
    taskArray.forEach((task, index) => {
        console.log(task);
        let $li = $(`<li class="list-item" id="listItem${index}">`);
        // let $button = $(`<button class="btn btn-${ currentUser ? colorWheel[currentUser].bootstrap : 'secondary'} popper" </button>`);
        let $button = $(`<button class="btn btn-${colorWheel[currentUser].bootstrap} popper" </button>`);
        // let $button = $(`<button class="btn btn-${userColor} popper" </button>`);
        // let $dataContent = ('<div class="data-content"></div>');
        // console.log($dataContent)
        // let $other = $(`<p>${task.description}</p>`);
        // $dataContent.append($other);
        // let $accept = $(`<a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a></button>`);
        // $accept.data('task_id', task.task_id);
        // $dataContent.append($accept);



        // $button.css(`border`, `2px solid ${currentUser.color}`)
        // $button.css(`background-color`, `${currentUser.color}`)
        console.log(task.task_id);
        $button.data({ toggle: 'popover', title: `<h5>${task.title}</h5><a class='btn popclose'>X</a>`, content: `<p>${task.description}</p> <a class='btn btn-secondary btn-lg editTaskButton'>Edit Task</a> <a class='btn btn-${colorWheel[currentUser].bootstrap} btn-lg acceptTaskButton' id="${task.task_id}">Accept</a>`, task_id: task.task_id });
        $li.append($button);
        // console.log($button);
        $li.append(`<h5>${task.title}</h5>`)

        //     data - toggle = "popover"
        //     html = "true"
        //     data - title = "${task.title}"
        //     data - content = "<p>${task.description}</p> <a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a>" >
        //         $li.append(`
        // <button class="btn btn-primary popper" data-toggle="popover" html="true" data-title="${task.title}" data-content="<p>${task.description}</p> <a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a>"></button>
        // <h5 class="task-name" id="task${index}">${task.title}</h5>
        // </li>`)

        $('.task-list').append($li);

    });
}
// function layTasks(taskArray) {
//     taskArray.forEach((task, index) => {
//         console.log(task);
//         $('.task-list').append(`<li class="list-item" id="listItem${index}">
//     <button class="btn btn-primary popper" data-toggle="popover" html="true" data-title="${task.title}" data-content="<p>${task.description}</p> <a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a>"></button>
//     <h5 class="task-name" id="task${index}">${task.title}</h5>
//     </li>`)
//     });
// }

// $('.toggler').change(function() {
//     $('#console-event').html('Toggle: ' + $(this).prop('checked'))
// })





layTasks(tasks);
layUsers(users);


$('.toggler').change(function() {
    console.log('Toggle: ' + $(this).prop('checked'))
    console.log($(this).data('index'))
    if (!$(this).prop('checked')) {
        $('.toggler').not($(this)).bootstrapToggle('on');
        currentUser = $(this).data('index');
    } else {
        let status = true;
        $('.toggler').each(function(toggler) {
            console.log(`Toggle${$(this).data('index')}` + $(this).prop('checked'))
            status = (status && $(this).prop('checked'));
            console.log($(this).data('index') + " :  " + status)
        })
        if (status) { currentUser = undefined }
    }
    layTasks(tasks)
})

// $('.toggler').on('mousedown', function() {
//     console.log('Toggle: ' + $(this).prop('checked'))
//     console.log($(this).data('index'))
//     $('.toggler').not($(this)).bootstrapToggle('on')
// })


function acceptTask(task_id) {

}



function getColor(userId) {
    return colorWheel[users.findIndex(user => user.id == userId)]
}