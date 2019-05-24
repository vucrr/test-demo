import { Flex, InputItem, Toast } from 'antd-mobile'
import { Button, Icon, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { validPhone, validTrim } from 'utils/utilsValid'
import styles from './UserInfo.less'

const Item = Flex.Item

interface UserInfoProps extends withLoadingProps {
  data: any
  form?: any
  mapAddressInfo: any
  handleClick: Function
  userForm: any
}

const getMapAddressInfo = (info: any) => {
  if (info.province === info.city) {
    return info.city + info.area + info.address
  }
  return info.province + info.city + info.area + info.address
}

class UserInfo extends React.Component<UserInfoProps> {
  onSubmit = () => {
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        this.props.setLoading(true)
        const data = { ...values, ...this.props.mapAddressInfo }
        await this.props.handleClick(data)
        trackClickEvent({ category: TrackEventTradeDev.address.Name, label: TrackEventTradeDev.address.Item })
        this.props.setLoading(false)
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  toLink = (link: string) => async () => {
    if (!link) return
    // 保存当前页面用户数据
    this.props.form.validateFields(async (_: any, values: any) => {
      const userId: any = Cookies.get('user_id_v2')
      Cookies.set('userForm_' + userId, unescape(JSON.stringify(values)), { expires: 1 })
    })
    const url =
      this.props.mapAddressInfo && this.props.mapAddressInfo.address
        ? '/mytrade/address/select'
        : '/mytrade/address/city-list'
    await Router.push({
      pathname: url,
    })
  }
  render() {
    const { form, mapAddressInfo, loading, userForm } = this.props
    const getFieldProps = form.getFieldProps
    const userDeliveryInfo = this.props.data.get('userDeliveryInfo')
    const Data = [
      {
        name: '收货人',
        title: 'contact', // InputItem返回的key
        prompt: '请输入姓名', // 提示文案
        placeholder: '输入您的姓名',
        validator: validTrim, // 是否验证value格式
        value: userForm ? userForm.contact : userDeliveryInfo.get('contact'),
        value2: false, // 判断是否有两行value
        required: true,
        link: false, // 是否可以跳转
        disable: '',
      },
      {
        name: '联系电话',
        title: 'phone',
        prompt: '请输入正确的手机号',
        placeholder: '输入手机号码',
        validator: validPhone,
        required: true,
        type: 'phone',
        value: userForm ? userForm.phone : userDeliveryInfo.get('phone'),
        value2: false,
        link: false,
        disable: '',
      },
      {
        name: '收货地址',
        title: 'address',
        prompt: '请选择收货地址',
        placeholder: '选择收货地址',
        validator: '',
        required: true,
        value: mapAddressInfo.detail_address || '',
        value2: getMapAddressInfo(mapAddressInfo) || false,
        link: true,
        disable: 'disabled',
      },
      {
        name: '门牌号',
        title: 'house_number',
        prompt: '请输入详细地址',
        placeholder: '详细地址，例：1号楼一单元101室',
        required: true,
        validator: validTrim,
        value: userForm ? userForm.house_number : userDeliveryInfo.get('house_number'),
        value2: false,
        link: false,
        disable: '',
      },
    ]

    return (
      <div>
        <div className={styles.infor}>
          {Data.map((item: any, index: number) => {
            return (
              <Flex className={styles.inforItem} key={index}>
                <span className={styles.infor_name}>{item.name}</span>
                <Flex justify="between" className={styles.infor_input} onClick={this.toLink(item.link)}>
                  {!item.value2 ? (
                    <Item>
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
                    </Item>
                  ) : (
                    <Item className={styles.item2}>
                      <p>{item.value}</p>
                      <p className={styles.gray}>{item.value2}</p>
                    </Item>
                  )}
                  {item.link && <Icon type={require('svg/arrow-right.svg')} className={styles.icon_right} />}
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

export default withLoading(createForm()(UserInfo))
