var panel = document.getElementById('panel');
var upButton = document.querySelector('#panel .up');
var downButton = document.querySelector('#panel .down');
var hammertime = new Hammer(panel);
hammertime.on('touch', function(ev) {
  console.log(ev);
});

var send = function (url) {
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    console.log(request.response);
  }
  request.send();
}

upButton.addEventListener('click', function () {
  send('/scrollUp')
})

downButton.addEventListener('click', function () {
  send('/scrollDown')
})
