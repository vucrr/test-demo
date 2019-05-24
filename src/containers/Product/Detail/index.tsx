import { GetInitialPropsContext } from '@@types/next'
import * as detailActions from 'actions/product/detail'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { Sticky, StickyContainer } from 'react-sticky'
import { bindActionCreators } from 'redux'
import Bottom from './Bottom'
import DiscountPromotion from './DiscountPromotion'
import HelpProblem from './HelpProblem'
import ImgDetail from './ImgDetail'
import PopupModal from './PopupModal'
import ProductInfo from './ProductInfo'
import RentPlan from './RentPlan'
import RentProcess from './RentProcess'
import ServicePromise from './ServicePromise'
import StickyTab from './StickyTab'
import TopCarousel from './TopCarousel'

interface DetailProps extends ErrorObject {
  url: {
    query: {
      id_activity: string
      selectedList?: string
    }
  }
  detail: any
  hideRecommendList: boolean
  onDetailActions: any
  utm: any
}

interface ButtonChildren {
  show: boolean
  togglePopup: Function
}

interface DetailState {
  // topPosition: number
  carouselBoxHeight: number
}

class Detail extends React.Component<DetailProps, DetailState> {
  static getInitialProps = async ({ store, query, req }: GetInitialPropsContext) => {
    if (query.id_activity) {
      const data = await store.dispatch(detailActions.fetchInfo({ product_id: query.id_activity, req }))
      if (data.status) return { error: data }
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }

  readonly state = {
    // topPosition: 79,
    carouselBoxHeight: 300,
  }

  componentWillUnmount(): void {
    // 页面返回时重新显示无货tips
    Cookies.remove('noStockTipsSession')

    // 页面返回时重置面板状态
    this.props.onDetailActions.changePopupModalId({ id: 0 })
  }

  render() {
    const {
      error,
      detail,
      url: { query },
      onDetailActions,
    } = this.props
    const { carouselBoxHeight } = this.state

    const baseInfo = detail.get('baseInfo')

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      hidden: true,
      backTop: carouselBoxHeight, // - topPosition,
      rightContentType: 'tabBar',
      borderBottom: true,
    }

    const containerProps = {
      renderHeader: (
        <Header mode="light" {...headerProps}>
          商品详情
        </Header>
      ),
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    const stickyTabProps = {
      onChangeStickyPosition: ({ carouselBoxHeight }: DetailState) => {
        this.setState({ carouselBoxHeight })
      },
    }

    const bottomProps = {
      selectedList: query.selectedList,
      curIdActivity: query.id_activity,
      idActivity: detail.get('idActivity'),
      onDetailActions,
      price: detail.getIn(['baseInfo', 'info', 'price']),
    }

    return (
      <Container {...containerProps}>
        <TopCarousel imageList={baseInfo.get('imageList')} newOrderInfo={baseInfo.get('newOrderInfo')} />
        <StickyContainer id="stickyContainer">
          <Sticky>
            {({ style, isSticky, distanceFromTop }: any) => (
              <StickyTab style={style} show={isSticky} distanceFromTop={distanceFromTop} {...stickyTabProps} />
            )}
          </Sticky>
          <ProductInfo info={baseInfo.get('info')} />
          <RentPlan rentPlan={baseInfo.get('rentPlan')} />
          <DiscountPromotion
            discountList={baseInfo.get('discountList')}
            promotionList={baseInfo.get('promotionList')}
          />
          <ServicePromise servicePromise={baseInfo.get('servicePromise')} />
          <RentProcess rentProcess={baseInfo.get('rentProcess')} rentPlan={baseInfo.get('rentPlan')} />
          <HelpProblem commonQuestionList={baseInfo.get('commonQuestionList')} />
          <ImgDetail productParam={baseInfo.get('productParam')} imageList={baseInfo.get('detailImageList')} />
        </StickyContainer>
        <Bottom {...bottomProps}>
          {({ show, togglePopup }: ButtonChildren) => <PopupModal show={show} togglePopup={togglePopup} />}
        </Bottom>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  detail: state.getIn(['product', 'detail']),
  utm: state.getIn(['serverApp', 'utm']),
  hideRecommendList: state.getIn(['serverApp', 'tabBar', 'hideHome']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onDetailActions: bindActionCreators(detailActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail)
