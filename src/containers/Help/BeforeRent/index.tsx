import { Container, Header, TabBar } from 'components'
import { AfterRentProps, AfterRentStates } from 'containers/Help/AfterRent'
import React from 'react'
import { connect } from 'react-redux'
import { scrollToAnchor } from 'utils/tools'
import AccordionList from '../AccordionList'
import Footer from '../Footer'
import styles from '../commonHelp.less'
import AccordionOne from './AccordionOne'
import AccordionThree from './AccordionThree'
import AccordionTwo from './AccordionTwo'

type BeforeRentProps = AfterRentProps
type BeforeRentsStates = AfterRentStates

class BeforeRent extends React.Component<BeforeRentProps, BeforeRentsStates> {
  readonly state = {
    activeKey: this.props.query.question,
  }

  componentDidMount() {
    setTimeout(() => {
      const question = this.props.query.question
      question && scrollToAnchor(`#question${this.props.query.question}`)
    }, 0)
  }

  render() {
    const { activeKey } = this.state
    const { utm } = this.props
    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>租前了解</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    const handleAccordionChange = (key: string) => {
      this.setState({ activeKey: key })
    }

    return (
      <Container className={styles.commonBox} {...containerProps}>
        <AccordionList activeKey={activeKey} onAccordionChange={handleAccordionChange}>
          <AccordionOne utm={utm} />
          <AccordionTwo />
          <AccordionThree utm={utm} />
        </AccordionList>
        <Footer />
      </Container>
    )
  }
}

const mapStateToProps = (state: any, ownProps: { url: { query: any } }) => ({
  query: ownProps.url.query,
  utm: state.getIn(['serverApp', 'utm']),
})

export default connect(mapStateToProps)(BeforeRent)
