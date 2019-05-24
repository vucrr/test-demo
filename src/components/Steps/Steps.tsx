import { Flex, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Copy, Icon } from 'components'
import React from 'react'
import styles from './Steps.less'

export interface StepsProps {
  logs: any
}
export interface StepsState {}

// icon 状态 1初始化  2进行中  3已完成  4报错

const status: any = {
  1: require('svg/jinxingzhong.svg'),
  2: require('svg/zuihou.svg'),
  3: require('svg/yiwancheng.svg'),
  4: require('svg/butongguo.svg'),
  5: require('svg/weijinxing.svg'),
}

class Steps extends React.Component<StepsProps, StepsState> {
  onClickCopy = () => {
    Toast.info('复制成功', 1.5)
  }
  render() {
    return (
      <div className={styles.Steps}>
        {this.props.logs.map((items: any, index: number) => {
          return (
            <Flex align="stretch" className={styles.phase} key={index}>
              <Flex className={styles.progress} direction="column">
                <Icon type={status[items.get('status')]} className={styles.icon} />
              </Flex>
              <div className={classnames(styles.process_detail, index !== 0 && styles.done)}>
                <h4>{items.get('remark')}</h4>
                {items.get('content').map((item: any, ide: number) => <h5 key={ide}>{item}</h5>)}
                {items.get('copy') && (
                  <div className={styles.pro_copy}>
                    <p>上海市宝山区纪蕰路588号智力产业园2号楼1楼享换机</p>
                    <p>联系人：徐先生</p>
                    <p>
                      手机号：13310155193
                      <Copy
                        onCopied={this.onClickCopy}
                        text="上海市宝山区纪蕰路588号智力产业园2号楼1楼享换机 联系人：徐先生 手机号：13310155193"
                      >
                        <span className={styles.copy_ok}>复制</span>
                      </Copy>
                    </p>
                  </div>
                )}
                {items.get('dt_created') && <p className={styles.pro_date}>{items.get('dt_created')}</p>}
              </div>
            </Flex>
          )
        })}
      </div>
    )
  }
}

export default Steps
