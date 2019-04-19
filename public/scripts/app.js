
let text =""

let mvpTasks = []
mvpTasks.push({
    name: "mvpTasks",
    description: 'working',
    status: "pending"})


function getSelectionText() {
  if (window.getSelection) {
    text = window.getSelection().toString()
    mvpTasks.push({
    name: "mvpTasks",
    description: text,
    status: "pending"
  });
    console.log(text)
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text
}

$("textarea").on("dragenter", getSelectionText);

// $(".drop-me").on("dragenter", function(ev) {
//   ev.preventDefault();
// });


// function createProject() {
//   $.ajax({
//     method: 'POST',
//     url: postUrl,



//   });
// }

// function getProject() {
//   $.ajax({
//     method: "GET",
//     url: getURL,
//     success: function(req) {
//       console.log(req);
//     },
//     error: function() {
//       alert("There was an error getting weather data.");
//     },
//     complete: function() {}
//   });


function postTask() {
   $.ajax({
    method: "POST",
    url: "/api/projects/5cb9e61f7c11028574cff98a/taskarray",
    data: {task: mvpTasks},
    success: function(response) {
      console.log(response)
    },
    error: function() {
      alert("There was an error");
    },
    complete: function() {}
  });
}

$("#test1").on("click", postTask);




// $("#help").on("click", request);

// $("#help").on("click", request);




// function request () { $.ajax({
//   dataType: "json",
//   url: "/api/projectsprojects/5cb9e61f7c11028574cff98a/taskarray",
//   method: "POST",
//   data: { "": mvpTasks }
// })};


// $('#help').on('click', request)

