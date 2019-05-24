declare module 'rc-queue-anim' {
  import React from 'react'

  type types = 'alpha' | 'left' | 'right' | 'top' | 'bottom' | 'scale' | 'scaleBig' | 'scaleX' | 'scaleY'

  interface QueueAnimProps {
    type: types | types[]
    animConfig: object | object[]
    delay: number | number[]
    duration: number | number[]
    interval: number | number[]
    leaveReverse: boolean
    ease: string | string[]
    appear: boolean
    animatingClassName: string[]
    component: React.ReactType
    onEnd?: (key?: string, type?: 'enter' | 'leave') => void
  }

  export default class QueueAnim extends React.Component<Partial<QueueAnimProps>> {}
}
