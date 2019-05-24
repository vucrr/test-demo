import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { createRepairForm, getRepairForm } from 'actions/myAccount/repair/form'
import { List, TextareaItem, Toast } from 'antd-mobile'
import { Button, ChooseList, Container, Header, PopupModal, Switch, TabBar, Wrap } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import { RepairFormReturns } from 'interfaces/repair'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import styles from './index.less'

const Item = List.Item

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>维修申报</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

function marshal(options: string[]): { value: number; label: string }[] {
  return options.map((option: string, index: number) => {
    return {
      value: index,
      label: option,
    }
  })
}

function unmarshal(options: { value: number; label: string }[]): string {
  return options.map(o => o.value).join(',')
}

interface RepairFormProps extends ErrorObject {
  query: {
    trade_no: string
  }
  data: RepairFormReturns
  createRepairForm: Function
}

class RepairForm extends React.Component<RepairFormProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.trade_no) {
        const data = await store.dispatch(getRepairForm(query.trade_no, query.type, req))
        return { data }
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }

  readonly state = {
    options: [],
    visible: false,
    checked: true,
    remark: '',
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  handleChange = (scope: string) => (val: unknown) => {
    this.setState({ [scope]: val })
  }

  get disabled() {
    return !this.state.options.length
  }

  submit = async () => {
    const { createRepairForm, query } = this.props
    const body = {
      trade_no: query.trade_no,
      reason: unmarshal(this.state.options),
      remark: this.state.remark,
      with_spare_machine: this.state.checked ? 1 : 0,
    }
    const res = await createRepairForm(body)
    if (res.status) Toast.info(res.errorMsg)
    else {
      await Router.push({ pathname: '/myaccount/repair/quality-detail', query: { sn: res.sn } })
    }
  }

  renderExtra() {
    return (
      <span className={styles.check} onClick={this.toggleModal}>
        了解详情
      </span>
    )
  }

  renderModal() {
    return (
      <PopupModal visible={this.state.visible} onClose={this.toggleModal} title="申请须知">
        <div className={styles.modalWrapper}>
          <ul>
            <li>• 手机维修期间，您可申请一台备用机。</li>
            <li>• 提交申请后，享换机客服将尽快与您联系。</li>
            <li>• 支付备用机押金后，将为您寄出机器。</li>
            <li>• 邮寄归还备用机后，将退回押金。</li>
          </ul>
        </div>
      </PopupModal>
    )
  }

  render() {
    const { checked } = this.state
    const { data, error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    if (!data) {
      return null
    }
    return (
      <Container {...containerProps}>
        <Wrap size="md" bgColor="#fff">
          <h1 className={styles.title}>选择您的机器出现的质量问题(可多选)</h1>
          <ChooseList options={marshal(data.quality_list)} onSelect={this.handleChange('options')} multi={true} />
        </Wrap>
        <Wrap size="md" bgColor="#fff" className={styles.wrapper}>
          <h1 className={styles.title}>补充描述您遇到的问题，方便快速维修(选填)</h1>
          <TextareaItem
            className={styles.textarea}
            placeholder="请填写具体原因"
            rows={3}
            count={50}
            onChange={this.handleChange('remark')}
          />
        </Wrap>
        <List>
          <Item extra={this.renderExtra()}>
            <Switch round={true} onChange={this.handleChange('checked')} checked={checked}>
              申请备用机
            </Switch>
          </Item>
        </List>
        <div className={styles.btnWrapper}>
          <Button type="primary" onClick={this.submit} disabled={this.disabled}>
            提交
          </Button>
        </div>
        {this.renderModal()}
      </Container>
    )
  }
}

export default connect(
  null,
  { createRepairForm },
)(RepairForm)
