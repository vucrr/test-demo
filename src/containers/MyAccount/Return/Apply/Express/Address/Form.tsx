import { Flex, InputItem, Toast } from 'antd-mobile'
import { Button, Icon, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { validPhone, validTrim } from 'utils/utilsValid'
import styles from './Form.less'

const Item = Flex.Item

interface UserInfoProps extends withLoadingProps {
  data: any
  form?: any
  mapAddressInfo: any
  onSubmit: any
  userForm: any
  changeUserInfo: Function
}

const getMapAddressInfo = (info: any) => {
  if (info.province === info.city) {
    return info.city + info.county + info.address
  }
  return info.province + info.city + info.county + info.address
}

class UserInfo extends React.Component<UserInfoProps> {
  handleClick = () => {
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        this.props.onSubmit(values)
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
      query: {
        redirect: `${window.location.href}&form=true`,
      },
    })
  }
  render() {
    const { form, mapAddressInfo, loading, userForm } = this.props
    const getFieldProps = form.getFieldProps
    const userDeliveryInfo = {
      contact: this.props.data.getIn(['user', 'contact']),
      phone: this.props.data.getIn(['user', 'phone']),
      houseNumber: this.props.data.getIn(['user', 'house_number']),
    }
    const Data = [
      {
        name: '联系人',
        title: 'contact', // InputItem返回的key
        prompt: '请填写联系人', // 提示文案
        placeholder: '请填写联系人',
        validator: validTrim, // 是否验证value格式
        value: userForm ? userForm.contact : userDeliveryInfo.contact,
        value2: false, // 判断是否有两行value
        required: true,
        link: false, // 是否可以跳转
        disable: '',
      },
      {
        name: '联系电话',
        title: 'phone',
        prompt: '请输入正确的手机号',
        placeholder: '请填写手机号',
        validator: validPhone,
        required: true,
        type: 'phone',
        value: userForm ? userForm.phone : userDeliveryInfo.phone,
        value2: false,
        link: false,
        disable: '',
      },
      {
        name: '取件地址',
        title: 'address',
        prompt: '请选择取件地址',
        placeholder: '选择取件地址',
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
        placeholder: '请填写门牌号',
        required: true,
        validator: validTrim,
        value: userForm ? userForm.house_number : userDeliveryInfo.houseNumber,
        value2: false,
        link: false,
        disable: '',
      },
    ]

    return (
      <div>
        <div className={styles.info}>
          {Data.map((item: any, index: number) => {
            return (
              <Flex className={styles.infoItem} key={index}>
                <span className={styles.info_name}>{item.name}</span>
                <Flex justify="between" className={styles.info_input} onClick={this.toLink(item.link)}>
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
        <Button disabled={loading} className={styles.btn_submit} type="primary" onClick={this.handleClick}>
          保存
        </Button>
      </div>
    )
  }
}

export default withLoading(createForm()(UserInfo))
