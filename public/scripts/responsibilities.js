console.log('sanity check')

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// $(function () {
//   $('[data-toggle="popover"]').popover()
// })


$('.popper').popover({
  html: true,
  // content: '<p>This is the description of the Task.</p>  <a data-toggle="modal" href="#theModal" class="btn btn-primary btn-lg btn-block">More</a>'
  content: '<p>This is the description of the Task.</p> <a class="btn btn-primary btn-lg" on-click(console.log("idiot"))>Accept</a> <a href="#theModal" data-toggle="modal" data-target="#modal" class="btn btn-primary btn-lg button">More Info</a>'
});



$( function() {
  $( "#taskList" ).sortable();
} );