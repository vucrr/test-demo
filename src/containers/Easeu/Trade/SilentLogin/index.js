import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { noop } from 'utils/tools'
import { ENV } from 'utils/config'
import { Container, Header } from 'components'

const SilentLogin = () => {
  const headerProps = {
    icon: '',
    onLeftClick: noop,
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>轻松用</Header>,
  }

  return <Container {...containerProps}>SilentLogin</Container>
}

SilentLogin.propTypes = {
  trade: PropTypes.instanceOf(Immutable.Map).isRequired,
  // onTradeActions: PropTypes.object.isRequired,
}

SilentLogin.getInitialProps = async ({ isServer, query, req, res }) => {
  if (isServer) {
    const { md5 } = require('../../../../../server/utils/crypto')
    const hostMd5 = ENV === 'dev' ? md5('test8.easeua.t.xianghuanji.com') : md5(req.headers.host)
    const expires = new Date(Date.now() + 8640000000)
    res.cookie('user_id_v2', query.user_id, { expires })
    query.user_token && res.cookie('userToken', query.user_token, { expires })
    res.cookie('channelId', query.channel_id, { expires })
    res.cookie(`user_id_${hostMd5}`, query.user_id, { expires })
    res.cookie(`channel_id_${hostMd5}`, query.channel_id, { expires })
  }
}

const mapStateToProps = state => ({
  trade: state.getIn(['easeu', 'trade', 'index']),
})

export default connect(mapStateToProps)(SilentLogin)
