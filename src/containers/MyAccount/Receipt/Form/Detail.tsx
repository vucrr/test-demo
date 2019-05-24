import { Flex, InputItem, Modal, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon, PopupModal, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { createForm } from 'rc-form'
import * as React from 'react'
import popupStyles from 'themes/action-sheet.less'
import { validEmail, validTaxerNo, validTrim } from 'utils/utilsValid'
import styles from './Detail.less'

interface DetailProps extends withLoadingProps {
  form?: any
  handleClick: Function
  openType: 'merge' | 'stage'
}

interface DetailState {
  openType: 'merge' | 'stage' | ''
  type: 'person' | 'company'
  visible: boolean
  resceiveTypeText: string
  noOpenType: boolean
}

const typeData = {
  person: {
    message: '请输入发票抬头',
    placeholder: '请输入发票抬头，如：个人',
  },
  company: {
    message: '请输入公司全称',
    placeholder: '请输入公司全称',
  },
}

class Detail extends React.Component<DetailProps, DetailState> {
  readonly state: DetailState = {
    openType: '',
    type: 'person',
    visible: false,
    resceiveTypeText: '请选择',
    noOpenType: false,
  }
  // 弹层
  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  // 选择开票方式
  isSelect = (openType: 'merge' | 'stage') => {
    this.setState({
      openType,
      visible: false,
      resceiveTypeText: openType === 'merge' ? '合并开票' : '按期开票',
    })
  }
  renderModal = () => {
    return (
      <PopupModal
        className={styles.popBody}
        bodyClassName={styles.popBox}
        visible={this.state.visible}
        onClose={this.toggleModal}
        title="选择开票方式"
      >
        <div className={classnames(popupStyles.popup_body_box, styles.sheet)}>
          <p className={styles.msg}>发票方式一经选择，服务期间无法更改。</p>
          <div className={styles.sheet_box} onClick={() => this.isSelect('merge')}>
            <Flex justify="between" className={styles.sheet_title}>
              合并开票{this.state.openType === 'merge' ? <Icon type={require('svg/xuanzhong.svg')} /> : <span />}
            </Flex>
            <p>
              开票时间：发票将在<span>服务终止/换机</span>后开具 <br />
              发票金额：订单支付总金额
            </p>
          </div>
          <div className={styles.sheet_box} onClick={() => this.isSelect('stage')}>
            <Flex justify="between" className={styles.sheet_title}>
              按期开票{this.state.openType === 'stage' ? <Icon type={require('svg/xuanzhong.svg')} /> : <span />}
            </Flex>
            <p>
              开票时间：发票将在<span>每期租金支付后</span>开具 <br />
              发票金额：每期支付金额
            </p>
          </div>
        </div>,
      </PopupModal>
    )
  }
  onSubmit = () => {
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        if (!this.state.noOpenType) {
          Modal.alert(
            '确认开票方式',
            <p>您已选择{this.state.resceiveTypeText}，确认后服务期间无法更改，确定要继续吗？</p>,
            [
              { text: '取消' },
              {
                text: '确定',
                onPress: () => this.saveApply(values),
              },
            ],
            'android',
          )
        } else {
          await this.saveApply(values)
        }
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }
  // 保存数据
  saveApply = async (values: object) => {
    this.props.setLoading(true)
    const query = { ...values, invoice_type: this.state.type, open_type: this.state.openType }
    await this.props.handleClick(query)
    this.props.setLoading(false)
  }
  msgIdentification = () => {
    Modal.alert(
      '纳税人识别号',
      '纳税人识别号为营业执照上的统一社会信用代码或税务登记证上的税号。为确保发票开具的准确性，建议与公司财务确认后填写。',
      [{ text: '我知道了' }],
      'android',
    )
  }
  msgResceiveType = (msg: 'merge' | 'stage') => {
    const magData = {
      merge: {
        title: '合并开票',
        content: (
          <p>
            发票将在服务 <span className={styles.msgSpan}>终止/换机</span> 后自动开具，开票金额为订单支付总金额
          </p>
        ),
      },
      stage: {
        title: '按期开票',
        content: (
          <p>
            发票将在 <span className={styles.msgSpan}>每期租金支付后</span> 自动开具，开票金额为每期支付金额
          </p>
        ),
      },
    }
    Modal.alert(magData[msg].title, magData[msg].content, [{ text: '我知道了' }], 'android')
  }
  invoiceType = (type: 'person' | 'company') => {
    this.setState({ type })
  }
  disabled() {
    const {
      form: { getFieldValue },
    } = this.props
    const openType = this.state.openType === '' ? false : true
    if (this.state.type === 'company') {
      return !(getFieldValue('invoice_title') && getFieldValue('email') && openType && getFieldValue('taxer_no'))
    }
    return !(getFieldValue('invoice_title') && getFieldValue('email') && openType)
  }
  render() {
    const { form, openType } = this.props
    const getFieldProps = form.getFieldProps
    if ((openType === 'merge' || openType === 'stage') && !this.state.noOpenType) {
      this.isSelect(openType)
      this.setState({
        noOpenType: true,
      })
    }
    return (
      <div className={styles.FormDetail}>
        <h2>发票抬头</h2>
        <Flex justify="between">
          <Flex
            className={classnames(styles.type, this.state.type === 'person' && styles.select)}
            onClick={() => this.invoiceType('person')}
            justify="center"
            align="center"
          >
            <Icon className={styles.icon} type={require('svg/receipt-personal.svg')} />个人
          </Flex>
          <Flex
            className={classnames(styles.type, this.state.type === 'company' && styles.select)}
            onClick={() => this.invoiceType('company')}
            justify="center"
            align="center"
          >
            <Icon className={styles.icon} type={require('svg/receipt-company.svg')} />公司
          </Flex>
        </Flex>
        <InputItem
          {...getFieldProps('invoice_title', {
            initialValue: '',
            rules: [{ required: true, message: typeData[this.state.type].message }, { validator: validTrim }],
          })}
          className={styles.input}
          clear={true}
          type={'text'}
          placeholder={typeData[this.state.type].placeholder}
        />
        {this.state.type === 'company' && (
          <>
            <h2 onClick={this.msgIdentification}>
              纳税人识别号<Icon type={require('svg/question-circle.svg')} className={styles.icon} size="xxs" />
            </h2>
            <InputItem
              {...getFieldProps('taxer_no', {
                initialValue: '',
                rules: [{ required: true, message: '请输入纳税人识别号' }, { validator: validTaxerNo }],
              })}
              className={styles.input}
              clear={true}
              maxLength="20"
              type={'text'}
              placeholder={'请输入纳税人识别号'}
            />
          </>
        )}
        <h2>请输入您常用的电子邮箱</h2>
        <InputItem
          {...getFieldProps('email', {
            initialValue: '',
            rules: [{ required: true, message: '请输入您的电子邮箱' }, { validator: validEmail }],
          })}
          className={styles.input}
          clear={true}
          type={'text'}
          placeholder={'用于查收发票'}
        />
        <h2>开票方式</h2>

        {!this.state.noOpenType ? (
          <Flex className={styles.resceiveType} justify="between" onClick={this.toggleModal}>
            开票方式
            <Flex align="center" className={styles.typeSelect}>
              {this.state.resceiveTypeText}
              <Icon color="#AAAAAA" type={require('svg/arrow-right.svg')} className={styles.to_icon} />
            </Flex>
          </Flex>
        ) : (
          <Flex
            className={styles.resceiveType}
            justify="between"
            onClick={() => this.msgResceiveType(this.props.openType)}
          >
            开票方式
            <Flex align="center" className={styles.typeSelect}>
              {this.state.resceiveTypeText}
              <Icon type={require('svg/question-circle.svg')} className={styles.icon} size="xxs" />
            </Flex>
          </Flex>
        )}
        <Button disabled={this.disabled()} type="primary" className={styles.btn} onClick={this.onSubmit}>
          提交
        </Button>
        {this.renderModal()}
      </div>
    )
  }
}

export default withLoading(createForm()(Detail))
