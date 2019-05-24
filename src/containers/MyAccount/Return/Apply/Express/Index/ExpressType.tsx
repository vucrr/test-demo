import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import ExpressByOrder from './ExpressByOrder'
import ExpressBySelf from './ExpressBySelf'
import TypeSelector from './TypeSelector'
import { expressTypeList } from './index'

export interface TypeProps {
  query: any
  onExpress: any
  expressInfo: any
  isDetailPage: any
  expressType: any
}

export interface TypeState {
  show: boolean
}

class ExpressType extends React.Component<TypeProps, TypeState> {
  state = {
    show: false,
  }

  toggleTypeSelector = () => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name3}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    if (!this.state.show) {
      trackClickEvent(trackEvent)
    }
    this.setState({ show: !this.state.show })
  }

  handleConfirm = (code: number) => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name10}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    trackClickEvent(trackEvent)
    this.props.onExpress.changeExpressType(code)
    this.setState({ show: !this.state.show })
  }

  render() {
    const { query, onExpress, expressInfo, isDetailPage, expressType } = this.props
    const list = expressInfo.getIn(['detail', 'express_type_list'])
    const expressProps = {
      query,
      onExpress,
      expressInfo,
      isDetailPage,
      expressType,
      toggleTypeSelector: this.toggleTypeSelector,
    }
    return (
      <>
        {expressType === expressTypeList.bySelf ? (
          <ExpressBySelf {...expressProps} />
        ) : (
          <ExpressByOrder {...expressProps} />
        )}
        {!isDetailPage && (
          <TypeSelector
            list={list}
            expressType={expressType}
            handleConfirm={this.handleConfirm}
            show={this.state.show}
            toggleTypeSelector={this.toggleTypeSelector}
          />
        )}
      </>
    )
  }
}
export default ExpressType
