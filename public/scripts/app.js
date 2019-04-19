
let text =""

let mvpTasks = []


function getSelectionText() {
  if (window.getSelection) {
    text = window.getSelection().toString()
    console.log(text)
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text
}

$("textarea").on("dragstart", getSelectionText);

$('.drop-me').on('dragenter', function () {
     mvpTasks.push({
     name: "mvpTasks",
     description: text,
     status: "pending"
   });
   console.log(mvpTasks)
})

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

$('#createProject').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    method: "POST",
    url: "/api/projects/",
    data: $(this).serialize(),
    success: function(response) {
       let jsonData = (response);
       alert('your unique project id is ' + jsonData._id)
    },
    error: function() {
      alert("There was an error");
    },
    complete: function() {
      const projectID = prompt('enter your unique project id')
    }
  });
})


function createProject() {
 $.ajax({
   method: "POST",
   url: "/api/projects",
   data: {},
   success: function(response) {
     console.log(response);
   },
   error: function() {
     alert("There was an error");
   },
   complete: function() {}
 });
}

function postTask() {
   $.ajax({
     method: "POST",
     url: "/api/projects/" + projectID +"/taskarray",
     data: { task: mvpTasks },
     success: function(response) {
       console.log(response);
     },
     error: function() {
       alert("There was an error");
     },
     complete: function() {}
   });
}

$("#test1").on("keydown", function(e) {
  if (e.keycode === 50) {
    postTask
  }
});






// $("#help").on("click", request);

// $("#help").on("click", request);




// function request () { $.ajax({
//   dataType: "json",
//   url: "/api/projectsprojects/5cb9e61f7c11028574cff98a/taskarray",
//   method: "POST",
//   data: { "": mvpTasks }
// })};


// $('#help').on('click', request)

