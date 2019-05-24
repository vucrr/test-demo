import { NextSFC2 } from '@@types/next'
import { CSButtons, Container, Header, TabBar, Wrap } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Content from './Content'

interface CompensateProps extends ErrorObject {
  introduce: any
  query: {}
}

const Compensate: NextSFC2<CompensateProps> = ({ error }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>还机赔偿</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Content />
      <Wrap bgColor="#fff">
        <CSButtons />
      </Wrap>
    </Container>
  )
}

// Compensate.getInitialProps = async ({ store, query, isServer }) => {
//   await store.dispatch(fetchInfo({ query, isServer }))
// }

export default connect()(Compensate)
