import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { ReturnVia } from '../Index'
import Content from './Content'
import styles from './Content.less'
import Smail from './Smail'

interface TipsProps {
  url: {
    query: {
      via: string
      type: string
    }
  }
  isQsy: boolean
}

const Tips = ({ url: { query }, isQsy }: TipsProps) => {
  let containerProps
  if (query.type === 'miniProgram') {
    containerProps = {
      className: styles.smail,
    }
  } else {
    containerProps = {
      renderHeader: <Header>还机须知</Header>,
      renderTabBar: <TabBar hidden={true} />,
      className: styles.content,
    }
  }

  return (
    <Container {...containerProps}>
      {query.type === 'miniProgram' ? (
        <Smail isStore={query.via === ReturnVia.Store} />
      ) : (
        <Content isStore={query.via === ReturnVia.Store} isQsy={isQsy} />
      )}
    </Container>
  )
}
const mapStateToProps = (state: any) => ({
  isQsy: state.getIn(['serverApp', 'utm', 'isQsy']),
})

export default connect(mapStateToProps)(Tips)
