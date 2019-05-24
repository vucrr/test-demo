import { Container, Header, TabBar } from 'components'
import React from 'react'
import Content from './Content'
import styles from './Content.less'
interface StandardProps {
  url: {
    query: {
      type: string
    }
  }
}
const Standard = ({
  url: {
    query: { type },
  },
}: StandardProps) => {
  let containerProps
  if (type === 'miniProgram') {
    containerProps = {
      className: styles.smail,
    }
  } else {
    containerProps = {
      renderHeader: <Header>还机标准</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
  }

  return (
    <Container {...containerProps}>
      <Content />
    </Container>
  )
}

export default Standard
