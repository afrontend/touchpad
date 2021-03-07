var panel = document.getElementById('panel')
var leftButton = document.querySelector('.left')

var send = function (url) {
  let request = new XMLHttpRequest()
  request.open("POST", url)
  request.onload = function(){
    console.log(request.response)
  }
  request.send()
}

leftButton.addEventListener('click', () => {
  send('/volumeDown')
})

var rightButton = document.querySelector('.right')
rightButton.addEventListener('click', () => {
  send('/volumeUp')
})

var mc = new Hammer(panel)

mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })

var scrollUpCount = 0
var scrollDownCount = 0
var LIMIT_SCROLL_START = 1

// listen to events...
mc.on("panup pandown tap press", function(ev) {
    panel.textContent = ev.type +" gesture detected."
    console.log(panel.textContent)
    if (ev.type === 'panup') {
      scrollUpCount = scrollUpCount + 1
      if (scrollUpCount > LIMIT_SCROLL_START) {
        send('/scrollUp')
        // scrollUpCount = 0
      }
    } else if (ev.type === 'pandown') {
      scrollDownCount = scrollDownCount + 1
      if (scrollDownCount > LIMIT_SCROLL_START) {
        send('/scrollDown')
        // scrollDownCount = 0
      }
    } else {
      scrollUpCount = 0
      scrollDownCount = 0
    }
})
