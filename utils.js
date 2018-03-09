if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.clearTimeout
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
    x -= element.offsetLeft
    y -= element.offsetTop
    touch.x = x
    touch.y = y
  })
  return touch
}

// 返回坐标x,y，是否在rect区域中
utils.containsPoint = function (rect, x, y) {
  // console.log(rect)
  // console.log(x)
  // console.log(y)
  return !(x < rect.x || x > rect.x + rect.width ||
    y < rect.y || y > rect.y + rect.height)
}

// 参数为两个矩形对象，如果两个矩相交，返回true，否则返回false
utils.intersects = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectA.y + rectB.height < rectA.y)
}
