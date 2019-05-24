import { Flex, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Copy, Icon } from 'components'
import React from 'react'
import styles from './Process.less'

const Process = ({ logs }: any) => {
  const onClickCopy = () => {
    Toast.info('复制成功', 1.5)
  }
  // 098D83
  const logLeg = logs.size || 1
  return (
    <div className={styles.qua_process}>
      {logs.map((item: any, index: number) => {
        const permo = item.get('is_repair_approved') || item.get('is_spare_machine_receipt')
        const warning = item.get('remark') === '质检不合格'
        return (
          <Flex align="stretch" className={styles.phase} key={index}>
            <Flex className={styles.progress} direction="column">
              {index === 0 && warning ? (
                <Icon type={require('svg/butongguo.svg')} className={styles.icon} />
              ) : (
                index === 0 && logLeg !== 1 && <Icon type={require('svg/zuihou.svg')} className={styles.icon} />
              )}
              {index === 0 && logLeg === 1 && <Icon type={require('svg/jinxingzhong.svg')} className={styles.icon} />}
              {index !== 0 && <Icon type={require('svg/yiwancheng.svg')} className={styles.icon} />}
            </Flex>
            {!permo && (
              <div className={classnames(styles.process_detail, index !== 0 && styles.done, warning && styles.warn)}>
                <h4>{item.get('remark')}</h4>
                {item.get('content') && <h5>{item.get('content')}</h5>}
                <p className={styles.pro_date}>{item.get('dt_created')}</p>
              </div>
            )}
            {permo && (
              <div className={classnames(styles.process_detail, index !== 0 && styles.done)}>
                <h4>{item.get('remark')}</h4>
                <h5 className={styles.pro_eva}>
                  {item.get('is_repair_approved')
                    ? '经评估，您的设备需要寄回享换机总部维修，请您寄回以下地址：'
                    : '请您在收到维修完成的设备后，尽快将备用机寄回以下地址：'}
                </h5>
                <div className={styles.pro_copy}>
                  <p>上海市宝山区纪蕰路588号智力产业园2号楼1楼享换机</p>
                  <p>联系人：徐先生</p>
                  <p>
                    手机号：13310155193<Copy
                      onCopied={onClickCopy}
                      text="上海市宝山区纪蕰路588号智力产业园2号楼1楼享换机 联系人：徐先生 手机号：13310155193"
                    >
                      <span className={styles.copy_ok}>复制</span>
                    </Copy>
                  </p>
                </div>
                <p className={styles.pro_date}>{item.get('dt_created')}</p>
              </div>
            )}
          </Flex>
        )
      })}
    </div>
  )
}

export default Process
