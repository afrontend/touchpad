var panel = document.getElementById('panel');
var hammertime = new Hammer(panel);
hammertime.on('touch', function(ev) {
  console.log(ev);
});