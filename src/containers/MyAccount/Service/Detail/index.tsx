import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchDetail } from 'actions/myAccount/service/detail'
import { buttonOptions } from 'actions/myAccount/service/list'
import { CSButtons, Container, Header, TabBar } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Tab from '../Tab'
import Detail from './Detail'
import ExchangeList from './ExchangeList'
import TopMsg from './TopMsg'
import TopStatus from './TopStatus'
import styles from './index.less'

interface ServiceDetailProps extends ErrorObject {
  query: {
    contract_no: string
  }
}

interface InjectProps {
  detail: any
  buttonOptions: any
}

const ServiceDetail: NextSFC2<ServiceDetailProps & InjectProps> = ({ error, detail, buttonOptions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps = {
    borderBottom: false,
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>服务详情</Header>,
    renderTabBar: <TabBar hidden={true} />,
    className: styles.detailWrapper,
  }
  return (
    <Container {...containerProps}>
      <Tab initialPage={0} />
      <TopMsg detail={detail} />
      <TopStatus detail={detail} buttonOptions={buttonOptions} />
      <Detail detail={detail} />
      <ExchangeList detail={detail} />
      <div className={styles.csbuttonWrapper}>
        <CSButtons trackEvents={[TrackEventMyCenter.OnlineService, TrackEventMyCenter.PhoneService]} />
      </div>
    </Container>
  )
}

ServiceDetail.getInitialProps = async ({ store, query, isServer, res, asPath, req }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(fetchDetail({ query, req }))
    if (data.status) {
      return { error: data }
    }
  }
}

const mapStateToProps = (state: any) => ({
  detail: state.getIn(['myAccount', 'service', 'detail']),
})

const mapDispatchToProps = {
  buttonOptions,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceDetail)
