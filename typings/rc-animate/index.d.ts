declare module 'rc-animate' {
  import React from 'react'

  interface AnimateProps {
    showProp: string
    exclusive: boolean
    transitionName: string
    transitionAppear: boolean
    transitionEnter: boolean
    transitionLeave: boolean
    onEnd: (key: string, exists: boolean) => void
    animation: object
    component: React.ReactType
  }

  export default class Animate extends React.Component<Partial<AnimateProps>> {}
}
