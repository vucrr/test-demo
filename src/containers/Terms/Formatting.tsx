import { Container, Header, TabBar } from 'components'
import React from 'react'
import styles from './common.less'

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>隐私擦除服务条款</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

const Formatting = () => (
  <Container {...containerProps}>
    <div className={styles.container}>
      <h1>FutureDial隐私擦除服务</h1>
      <p>
        隐私擦除服务的服务商为 <b>FutureDial</b>，是全美市场份额最高的数据清除专家。从2012年起，以最新技术，获得全美最大营运商评价为最有效率，且没有个人信息泄露担忧的专业方案。FutureDial
        对每支处理的手机提供清除认证，总部设于美国硅谷，全球已部署的四千台主机同时联机，每天处理超过13万支手机。目前客户包含
        美国四大营运商，日本三大营运商，中国富⼠士康，台湾三大营运商，中国移动，中国联通，华硕，联想，宏基，惠普，摩托罗拉，HTC，联想，诺基亚等。
      </p>
    </div>
  </Container>
)

export default Formatting
