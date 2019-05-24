import { Container, Header, TabBar } from 'components'
import React from 'react'
import styles from './common.less'

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>隐私险服务条款</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

const Insurance = () => (
  <Container {...containerProps}>
    <div className={styles.container}>
      <h1>隐私保险须知</h1>
      <p>
        隐私保险服务提供者为<b>众安在线财产保险股份有限公司</b>。
      </p>
      <h2>保险责任</h2>
      <p>
        用户归还租赁手机，享换机承诺将手机内的所有用户信息清除，如信息未彻底清除导致用户信息泄露，因此导致用户的直接经济损失，保险人按照合同约定在赔偿限额内负责赔偿。其他出售商品、提供服务所引起的索赔事件，不属于本保险责任范围，保险人不负责赔偿。
      </p>
      <p>
        <b>需公安机关对此信息泄露导致的损失立案，并确定责任为享换机，即可发起索赔。</b>
      </p>
      <h2>赔偿限额</h2>
      <p>
        <b>每人每次赔偿限额为5万元。</b>
      </p>
      <p>
        同一批次或同一直接原因（包括但不限于技术原因、人为失误、不法分子盗取）引起的信息泄露导致的用户直接经济损失，视为同一次事故，该次事故损失赔偿金额不超过10万元。
      </p>
      <h2>赔偿处理</h2>
      <p>
        <b>用户遇到隐私信息泄露问题即可联系享换机客服，并提供相关资料。享换机客服提报给保险人处理。</b>
      </p>
      <p>
        <b>
          保险人收到赔偿保险金的请求后，会在三十日内作出核定，核定结果由享换机客服通知用户；
          对属于保险责任的，在与保险人达成赔偿保险金的协议后十日内，保险人履行赔偿保险金义务。
        </b>
      </p>
      <p>资料包含：</p>
      <ul>
        <li>一. 订单信息；</li>
        <li>二. 公安责任认证证明；</li>
        <li>三. 索赔事故的说明及意见；</li>
        <li>
          四.
          涉及诉讼的，需提交法院的传票、诉状，以及其他所能提供的与确认保险事故的性质、原因、损失程度等有关的证明和资料。
        </li>
      </ul>
      <p>
        <b>每次事故赔偿限额10万元，每人每次赔偿限额为5万元。</b>
      </p>
    </div>
  </Container>
)

export default Insurance
