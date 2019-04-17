// let currentUser = { name: 'zack', color: 'red' };


const users = [
    { name: 'zack' },
    { name: 'david' },
    { name: 'justin' }
]



const colorWheel = [{ color: 'red', bootstrap: 'danger' }, { color: 'blue', bootstrap: 'primary' }, { color: 'green', bootstrap: 'success' }, { color: 'teal', bootstrap: 'info' }, { color: 'orange', greyed: 'palegoldenrod', text: 'black' }];


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
    console.log(event.target.parentNode.parentNode);
})


const tasks = [{ title: "get drunk", description: "this is mainly a drinking activity but people also sometimes use other methods for getting alcohol into their bodies", task_id: 9990999, user: '' },
    { title: "do work", description: "just another description for another activity", task_id: 3344334, user: '' },
    { title: "go Global", description: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.", task_id: 1234567, user: '' },
    { title: "Allons-y", description: "There's something that doesn't make sense. Let's go and poke it with a stick. Brave heart, Clara. I once spent a hell of a long time trying to get a gobby Australian to Heathrow airport. Oh, I always rip out the last page of a book.", task_id: 932345, user: '' },
];

function layUsers(userArray) {
    userArray.forEach((user, index) => {
        // let $circle = $(`<div class="userCircle"></div>`).css('background-color', colorWheel[index].color)
        // console.log($circle)
        // let $button = $(`<button type="button" class="btn btn-secondary btn-sm nametag"><p>${user.name}</p><div class="userCircle"></div></button>`);
        // $button.css(`background-color`, `${colorWheel[index].greyed}`);
        // console.log($button)

        let $button = $(`<input type="checkbox" checked data-toggle="toggle" data-onstyle="secondary" data-offstyle="${colorWheel[index].bootstrap}">`);

        $('#userPills').append($button);
    });
}


function layTasks(taskArray) {
    taskArray.forEach((task, index) => {
        console.log(task);
        let $li = $(`<li class="list-item" id="listItem${index}">`);
        let $button = $(`<button class="btn btn-secondary popper" </button>`);
        // let $dataContent = ('<div class="data-content"></div>');
        // console.log($dataContent)
        // let $other = $(`<p>${task.description}</p>`);
        // $dataContent.append($other);
        // let $accept = $(`<a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a></button>`);
        // $accept.data('task_id', task.task_id);
        // $dataContent.append($accept);



        // $button.css(`border`, `2px solid ${currentUser.color}`)
        // $button.css(`background-color`, `${currentUser.color}`)
        $button.data({ toggle: 'popover', title: `<h5>${task.title}</h5><a class='btn popclose'>X</a>`, content: `<p>${task.description}</p> <a class='btn btn-primary btn-lg editTaskButton'>Edit Task</a> <a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a>`, task_id: task.task_id });
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








// <li class="list-item" id="listItem8">
// <button class="btn btn-primary popper" data-toggle="popover" html="true" data-content="<p>whatever</p> <a class='btn btn-primary btn-lg acceptTaskButton'>Accept</a>"></button>
// <h5 class="task-name" id="task8">task number 8</h5>
// </li>





//<button class="popcloser" onclick="[data-dismiss='popover']"`

//class="popcloser" onclick="[data-dismiss='popover']"


layTasks(tasks);
layUsers(users);