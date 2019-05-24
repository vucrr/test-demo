import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import * as unionPayActions from 'actions/account/unionPay'
import { checkLogin } from 'actions/app'
import { Modal } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Item from '../List/Item'
import styles from '../List/List.less'

interface UnionPayDetailProps extends ErrorObject {
  unionPayDetail: any
  onUnionPayActions: any
}

const UnionPayDetail: NextSFC2<UnionPayDetailProps> = ({ error, unionPayDetail, onUnionPayActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps: any = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>银行卡管理</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const handleClick = (item: any) => {
    Modal.alert(
      '提示',
      '再次下单需要重新绑定银行卡，您确定要解绑吗？',
      [
        { text: '暂不解绑' },
        {
          text: '解绑',
          onPress: () => {
            onUnionPayActions.cancelBind({
              protocolNo: item.get('protocolNo'),
              bankCardNo: item.get('bankCardNo'),
              realName: item.get('realName'),
              idNo: item.get('idNo'),
              tel: item.get('tel'),
            })
          },
        },
      ],
      'android',
    )
  }

  return (
    <Container {...containerProps}>
      <div className={styles.list_box}>
        <Item item={unionPayDetail} type="item" />
        <div className={styles.btn_box}>
          <span className={styles.btn_default} onClick={() => handleClick(unionPayDetail)}>
            解除绑定
          </span>
        </div>
      </div>
    </Container>
  )
}

UnionPayDetail.getInitialProps = async ({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    if (query.protocolNo) {
      const data = await store.dispatch(unionPayActions.fetchDetail({ protocolNo: query.protocolNo as string, req }))
      if (data.status > 200) return { error: data }
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }
}

const mapStateToProps = (state: any) => ({
  unionPayDetail: state.getIn(['account', 'unionPay', 'detail']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onUnionPayActions: bindActionCreators(unionPayActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnionPayDetail)
