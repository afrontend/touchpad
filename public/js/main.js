var panel = document.getElementById('panel');

var send = function (url) {
  let request = new XMLHttpRequest();
  request.open("POST", url);
  request.onload = function(){
    console.log(request.response);
  }
  request.send();
}

var mc = new Hammer(panel);

mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panleft panright panup pandown tap press", function(ev) {
    panel.textContent = ev.type +" gesture detected.";
    if (ev.type === 'panup') {
      send('/scrollUp')
    } else if (ev.type === 'pandown') {
      send('/scrollDown')
    }
});
