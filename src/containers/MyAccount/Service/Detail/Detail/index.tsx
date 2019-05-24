import * as React from 'react'
import Exchange from './Exchange'
import Order from './Order'
import Service from './Service'

export interface DetailProps {
  detail: object
}

export interface DetailState {}

class Detail extends React.Component<DetailProps, DetailState> {
  render() {
    const detail = this.props.detail
    return (
      <>
        <Order detail={detail} />
        <Exchange detail={detail} />
        <Service detail={detail} />
      </>
    )
  }
}

export default Detail
