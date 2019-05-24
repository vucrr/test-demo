import { Flex } from 'antd-mobile'
import { AssetImage } from 'constant/uikit'
import * as React from 'react'
import styles from './common.less'
export interface StepProps {}

const Item = Flex.Item
const Step: React.FunctionComponent<StepProps> = () => {
  return (
    <div className={styles.info}>
      <h2>换机步骤</h2>
      <Flex className={styles.step} justify="around" align="start">
        <Item>
          <img src={AssetImage.MyTrade.Exchange.One} alt="" />
          <p>
            选择<br />换机
          </p>
        </Item>
        <Item>
          <img src={AssetImage.MyTrade.Exchange.Two} alt="" />
          <p>
            提交<br />换机单
          </p>
        </Item>
        <Item>
          <img src={AssetImage.MyTrade.Exchange.Three} alt="" />
          <p>
            签收<br />新机
          </p>
        </Item>
        <Item>
          <img src={AssetImage.MyTrade.Exchange.Four} alt="" />
          <p>
            归还<br />旧机
          </p>
        </Item>
        <Item>
          <img src={AssetImage.MyTrade.Exchange.Five} alt="" />
          <p>
            换机<br />成功
          </p>
        </Item>
      </Flex>
    </div>
  )
}

export default Step
