import { Flex, InputItem, Toast } from 'antd-mobile'
import { Button, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import { createForm } from 'rc-form'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { validPhone, validTrim } from 'utils/utilsValid'
import styles from './UserInfo.less'

const Item = Flex.Item

interface StoreInfoProps extends withLoadingProps {
  data: any
  form?: any
  mapAddressInfo: any
  handleClick: Function
}

class StoreInfo extends React.Component<StoreInfoProps> {
  onSubmit = () => {
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        this.props.setLoading(true)
        const { contact, phone } = values
        const data = { contact, phone }
        await this.props.handleClick(data)
        trackClickEvent({ category: TrackEventTradeDev.address.Name, label: TrackEventTradeDev.address.Item })
        this.props.setLoading(false)
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }
  render() {
    const { form, loading } = this.props
    const getFieldProps = form.getFieldProps
    const userDeliveryInfo = this.props.data.get('userDeliveryInfo')
    const userStoreInfo = this.props.data.get('userStoreInfo')
    const Data = [
      {
        name: '收货人',
        title: 'contact',
        prompt: '请输入姓名',
        placeholder: '输入您的姓名',
        required: true,
        validator: validTrim, // 是否验证value格式
        value: userDeliveryInfo.get('contact') || '',
        value2: false, // 判断是否有两行value
        link: false,
        disable: '',
      },
      {
        name: '联系电话',
        title: 'phone',
        required: true,
        prompt: '请输入正确的手机号',
        placeholder: '输入手机号码',
        validator: validPhone,
        type: 'phone',
        value: userDeliveryInfo.get('phone') || '',
        value2: false,
        link: false,
        disable: '',
      },
      {
        name: '收货方式',
        title: 'type',
        placeholder: '',
        value: '门店自提',
        prompt: '',
        validator: '',
        value2: false,
        link: false,
        disable: 'disabled',
      },
      {
        name: '门店名称',
        title: 'store_name',
        prompt: '',
        placeholder: '',
        value: userStoreInfo.get('store_name') || '',
        validator: '',
        value2: false,
        link: false,
        disable: 'disabled',
      },
      {
        name: '门店地址',
        title: 'store_address',
        prompt: '',
        placeholder: '',
        value: userStoreInfo.get('store_address') || '',
        validator: '',
        value2: false,
        link: false,
        disable: 'disabled',
      },
    ]
    return (
      <div>
        <div className={styles.infor}>
          {Data.map((item: any, index: number) => {
            return (
              <Flex className={styles.inforItem} key={index}>
                <span className={styles.infor_name}>{item.name}</span>
                <Flex justify="between" className={styles.infor_input}>
                  <Item>
                    {!item.disable ? (
                      <InputItem
                        {...getFieldProps(item.title, {
                          initialValue: item.value,
                          rules: [{ required: item.required, message: item.prompt }, { validator: item.validator }],
                        })}
                        clear={true}
                        type={item.type || 'text'}
                        disabled={item.disable}
                        placeholder={item.placeholder}
                      />
                    ) : (
                      <p className={styles.noChange}>{item.value}</p>
                    )}
                  </Item>
                </Flex>
              </Flex>
            )
          })}
        </div>
        <Button disabled={loading} className={styles.btn_submit} type="primary" onClick={() => this.onSubmit()}>
          保存
        </Button>
      </div>
    )
  }
}

export default withLoading(createForm()(StoreInfo))
