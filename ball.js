function Ball (radius, color) {
  if (radius === undefined) {
    radius = 40
  }
  if (color === undefined) {
    color = '#ff0000'
  }
  this.x = 0
  this.y = 0
  this.radius = radius
  // 增加速度向量变量
  this.vx = 0
  this.vy = 0
  this.rotation = 0
  this.scaleX = 1
  this.scaleY = 1
  this.color = '#ffff00'
  this.lineWidth = 1
}

Ball.prototype.draw = function (context) {
  context.save()
  context.translate(this.x, this.y)
  context.rotate(this.rotation)
  context.scale(this.scaleX, this.scaleY)
  context.lineWidth = this.lineWidth
  context.fillStyle = this.color
  context.beginPath()
  // x, y, radius, start_angle, end_angle, anticlockwise
  // 起始坐标x，y，半径，开始角度，结束角度，是否为逆时针
  context.arc(0, 0, this.radius, 0, (Math.PI * 2), true)
  context.closePath()
  context.fill()
  if (this.lineWidth > 0) {
    context.stroke()
  }
  context.restore()
}

// 返回刚好可以容纳小球的矩形，即小球的边界
Ball.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  }
}
