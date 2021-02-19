var panel = document.getElementById('panel');
var hammertime = new Hammer(panel);
hammertime.on('pan', function(ev) {
	console.log(ev);
});