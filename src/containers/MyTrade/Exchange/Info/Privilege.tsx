import { Flex } from 'antd-mobile'
import { AssetImage } from 'constant/uikit'
import * as React from 'react'
import styles from './common.less'

export interface PrivilegeProps {}
const Item = Flex.Item
const Privilege: React.FunctionComponent<PrivilegeProps> = () => {
  return (
    <div className={styles.info}>
      <h2>换机权益</h2>
      <Flex className={styles.privilege} justify="start" align="start">
        <img src={AssetImage.MyTrade.Exchange.Fangbian} alt="" />
        <Item>
          <h4>方便</h4>
          <p>先收新机再还旧机，充足的时间备份旧机数据。</p>
        </Item>
      </Flex>
      <Flex className={styles.privilege} justify="start" align="start">
        <img src={AssetImage.MyTrade.Exchange.Chaozhi} alt="" />
        <Item>
          <h4>超值</h4>
          <p>新机旧机重合使用期间，只收一部机器使用费。</p>
        </Item>
      </Flex>
      <Flex className={styles.privilege} justify="start" align="start">
        <img src={AssetImage.MyTrade.Exchange.Shengqian} alt="" />
        <Item>
          <h4>省钱</h4>
          <p>旧机押金可用做新机押金。</p>
        </Item>
      </Flex>
    </div>
  )
}

export default Privilege
