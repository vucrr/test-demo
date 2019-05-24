import { InputItem, List } from 'antd-mobile'
import { Copy, Icon } from 'components'
import React from 'react'
import styles from './ExpressType.less'

const Item = List.Item
const Brief = Item.Brief

export interface ExpressBySelfProps {
  onExpress: any
  expressInfo: any
  isDetailPage: any
  expressType: number
  toggleTypeSelector: any
}

export interface ExpressBySelfState {
  expressNo: any
  inputDisabled: boolean
}

export class ExpressBySelf extends React.Component<ExpressBySelfProps, ExpressBySelfState> {
  state = {
    expressNo: this.props.expressInfo.get('detail').get('logistics_no') || this.props.expressInfo.get('expressNo'),
    inputDisabled: this.props.isDetailPage,
  }

  handleChangeExpressNo = (value: any) => {
    this.setState({ expressNo: value })
    this.props.onExpress.getExpressNumber(value)
  }

  render() {
    const { isDetailPage, toggleTypeSelector } = this.props
    return (
      <div>
        {!isDetailPage && (
          <div className={styles.typeBox}>
            <div className={styles.info}>
              <Icon type={require('svg/express.svg')} className={styles.icon} />
              <div>
                <p className={styles.title}>自行快递寄回</p>
              </div>
            </div>
            <div className={styles.change} onClick={toggleTypeSelector}>
              更改寄件方式
            </div>
          </div>
        )}
        <div className={styles.expressBox}>
          <List>
            <Item>
              邮寄地址
              <Brief>
                <div>
                  享换机 13310155193<Copy text="享换机 13310155193 上海市宝山区纪蕴路588号智力产业园2号楼1楼 享换机">
                    <span>复制</span>
                  </Copy>
                </div>
                <p>上海市宝山区纪蕴路588号智力产业园2号楼1楼 享换机</p>
              </Brief>
            </Item>
            <InputItem
              placeholder="请输入所寄快件的物流单号"
              value={this.state.expressNo}
              onChange={this.handleChangeExpressNo}
              className={this.state.inputDisabled && styles.disabled}
              clear={true}
              editable={!isDetailPage}
            >
              物流单号
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default ExpressBySelf
