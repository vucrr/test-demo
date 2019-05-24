import React from 'react'

interface GesturesProps {
  [index: string]: any
}

// ref: https://github.com/eeandrew/gestures/blob/master/src/Gestures.js
class Gestures extends React.Component<Partial<GesturesProps>> {
  touchDistance = 0
  startX = 0
  startY = 0
  previousPinchScale = 1
  startTime = 0
  previousTouchTime = 0
  previousTouchPoint: { startX: number; startY: number } | null = null

  emit = (eventName: string, arg?: any) => {
    const handler = this.props[eventName]
    if (!handler) return
    handler(arg)
  }

  getDistance = (x: number, y: number) => {
    return Math.sqrt(x * x + y * y)
  }

  onTouchStart = (e: React.TouchEvent) => {
    const point = e.touches[0]
    this.startX = point.pageX
    this.startY = point.pageY

    if (e.touches.length > 1) {
      const point2 = e.touches[1]
      const x = Math.abs(point2.pageX - this.startX)
      const y = Math.abs(point2.pageY - this.startY)
      this.touchDistance = this.getDistance(x, y)
    } else {
      this.startTime = Date.now()
      if (this.previousTouchPoint) {
        if (
          Math.abs(this.startX - this.previousTouchPoint.startX) < 10 &&
          Math.abs(this.startY - this.previousTouchPoint.startY) < 10 &&
          Math.abs(this.startTime - this.previousTouchTime) < 300
        ) {
          this.emit('onDoubleTap')
        }
      }
      this.previousTouchTime = this.startTime
      this.previousTouchPoint = {
        startX: this.startX,
        startY: this.startY,
      }
    }
  }

  onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length > 1) {
      const x = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
      const y = Math.abs(e.touches[1].pageY - e.touches[1].pageY)
      const touchDistance = this.getDistance(x, y)

      if (touchDistance) {
        const pinchScale = touchDistance / this.touchDistance
        if (pinchScale > 2 || pinchScale < 1) return
        const delta = pinchScale - this.previousPinchScale
        this.emit('onPinch', delta)
        this.previousPinchScale = pinchScale
      }
    }
  }

  onTouchEnd = () => {
    this.startX = this.startY = this.touchDistance = 0
    this.previousPinchScale = 1
  }

  render() {
    const props = {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
    }

    return React.cloneElement(React.Children.only<any>(this.props.children), props)
  }
}

export default Gestures
