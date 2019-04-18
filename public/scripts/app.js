
let text = "";

function getSelectionText() {
  if (window.getSelection) {
    text = window.getSelection().toString()
    console.log(text);
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text
}

// console.log($('#date'))
// console.log($("#project"));
// console.log($("#team"));


// function test(){
//   $('textarea').on("dragstart", getSelectionText);
//   $('textarea').on('dragend', () => {
//     console.log('just ended')
//   })
  
// }

// $(function resize () {
//   var txt = $('#comments'),
//     hiddenDiv = $(document.createElement('div')),
//     content = null;

//   txt.addClass('txtstuff');
//   hiddenDiv.addClass('hiddendiv common');

//   $('body').append(hiddenDiv);

//   txt.on('keyup', function () {

//     content = $(this).val();

//     content = content.replace(/\n/g, '<br>');
//     hiddenDiv.html(content + '<br class="lbr">');

//     $(this).css('height', hiddenDiv.height());

//   });
// });



$('textarea').on('dragstart', getSelectionText)
//  $('textarea').on('dragenter', getSelectionText);



$('.drop-me').on('dragenter', function (ev) {
  ev.preventDefault()
  console.log(text)
})

// $('textarea').autoResize()

