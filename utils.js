if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
}
var utils = {}
// 计算鼠标的位置
utils.captureMouse = function (element) {
  var mouse = {
    x: 0,
    y: 0
  }
  element.addEventListener('mousemove', function (event) {
    var x, y
    if (event.pageX || event.pageY) {
      x = event.pageX
      y = event.pageY
    } else {
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    x -= element.offsetLeft
    y -= element.offsetTop
    mouse.x = x
    mouse.y = y
  })
  return mouse
}

utils.captureTouch = function (element) {
  var touch = {
    x: null,
    y: null,
    isPressed: false
  }
  element.addEventListener('touchstart', function (event) {
    touch.isPressed = true
  })
  element.addEventListener('touchend', function (event) {
    touch.isPressed = false
  })
  element.addEventListener('touchmove', function (event) {
    var x
    var y
    var touchEvent = event.touches[0]
    if (touchEvent.pageX || touchEvent.pageY) {
      x = touchEvent.pageX
      y = touchEvent.pageY
    } else {
      x = touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      y = touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    // console.log
    x -= element.offsetLeft
    y -= element.offsetTop
    touch.x = x
    touch.y = y
  })
  return touch
}

//
utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x || x > rect.x + rect.width ||
    y < rect.y || y > rect.y + rect.height)
}
