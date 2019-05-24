import { GetInitialPropsContext } from '@@types/next'
import { receiveInformationData } from 'actions/assess/informationManage'
import { Container, Header } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Content from './Content'

interface Props extends ErrorObject {
  informationData: any
}
class InformationManage extends React.Component<Props, any> {
  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    if (query.fundId) {
      await store.dispatch(receiveInformationData({ query, req }))
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }
  render() {
    const { error, informationData } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const containerProps = {
      renderHeader: <Header>资料管理</Header>,
    }
    return (
      <Container {...containerProps}>
        <Content data={informationData} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  informationData: state.getIn(['assess', 'informationData']),
})

export default connect(mapStateToProps)(InformationManage)
