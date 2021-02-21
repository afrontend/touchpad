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

var scrollUpCount = 0;
var scrollDownCount = 0;
var volumeUpCount = 0;
var volumeDownCount = 0;
var LIMIT_SCROLL_COUNT = 1
var LIMIT_VOLUME_COUNT = 5

// listen to events...
mc.on("panleft panright panup pandown tap press", function(ev) {
    panel.textContent = ev.type +" gesture detected.";
    console.log(panel.textContent)
    if (ev.type === 'panup') {
      scrollUpCount = scrollUpCount + 1
      if (scrollUpCount > LIMIT_SCROLL_COUNT) {
        send('/scrollUp')
        // scrollUpCount = 0;
      }
      volumeUpCount = 0;
      volumeDownCount = 0;
    } else if (ev.type === 'pandown') {
      scrollDownCount = scrollDownCount + 1
      if (scrollDownCount > LIMIT_SCROLL_COUNT) {
        send('/scrollDown')
        // scrollDownCount = 0;
      }
      volumeUpCount = 0;
      volumeDownCount = 0;
    } else if (ev.type === 'panleft') {
      volumeDownCount = volumeDownCount + 1
      if (volumeDownCount > LIMIT_VOLUME_COUNT) {
        send('/volumeDown')
        volumeDownCount = 0
      }
      scrollUpCount = 0;
      scrollDownCount = 0;
    } else if (ev.type === 'panright') {
      volumeUpCount = volumeUpCount + 1
      if (volumeUpCount > LIMIT_VOLUME_COUNT) {
        send('/volumeUp')
        volumeUpCount = 0
      }
      scrollUpCount = 0;
      scrollDownCount = 0;
    } else {
      scrollUpCount = 0;
      scrollDownCount = 0;
      volumeUpCount = 0;
      volumeDownCount = 0;
    }
});
