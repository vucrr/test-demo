import { Flex } from 'antd-mobile'
import { Icon, PopupModal } from 'components'
import React, { useState } from 'react'
import styles from './RentPlan.less'
import TitleBox from './TitleBox'

const Item = Flex.Item

export interface ModalProps {
  visible: boolean
  onClose: any
  plans: any
}

export const Modal: React.FunctionComponent<ModalProps> = ({ visible, onClose, plans }) => {
  return (
    <PopupModal
      visible={visible}
      className={styles.popup}
      onClose={() => onClose(false)}
      bodyClassName={styles.body}
      title={plans.get('title')}
    >
      <Flex className={styles.title_box} align="start">
        <Icon className={styles.icon} type={require('svg/zuman.svg')} />
        <Item>
          <h4>
            {plans.get('replace_title')} <span>推荐</span>
          </h4>
          <p>{plans.get('replace_content')}</p>
        </Item>
      </Flex>
      <div className={styles.box}>
        <p className={styles.title}>{plans.getIn(['other_plan', 'title'])}</p>
        {plans.getIn(['other_plan', 'list']).map((item: any, index: number) => {
          return (
            <Flex className={styles.item} align="start" key={index}>
              <div className={styles.icon} style={{ backgroundImage: `url(${item.get('icon')})` }} />
              <Item>
                <h5>{item.get('title')}</h5>
                <p>{item.get('content')}</p>
              </Item>
            </Flex>
          )
        })}
      </div>
    </PopupModal>
  )
}

export interface RentPlanProps {
  rentPlan: any
}

export interface RentPlanState {
  showModal: boolean
}

const RentPlan: React.FunctionComponent<RentPlanProps> = ({ rentPlan }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleModal = (showModal: boolean) => {
    setShowModal(showModal)
  }

  const rentPlanList: string[] = Object.values(rentPlan.getIn(['first_duration', 'list']).toJS())

  return (
    <div className={styles.rent_plan}>
      <TitleBox>{rentPlan.get('title')}</TitleBox>
      <div className={styles.list}>
        <Flex className={styles.item} align="start">
          <div className={styles.icon} />
          <Item>
            <h5>{rentPlan.getIn(['first_duration', 'title'])}</h5>
            <Flex className={styles.period}>
              {rentPlanList.map((item: string, index: number) => {
                return (
                  <span className={styles.red} key={index}>
                    {item}
                  </span>
                )
              })}
              <i className={styles.tips}>{rentPlan.getIn(['first_duration', 'tips'])}</i>
            </Flex>
          </Item>
        </Flex>
        <Flex className={styles.item} align="start">
          <div className={styles.icon} />
          <Item>
            <h5>{rentPlan.getIn(['second_duration', 'title'])}</h5>
            <Flex className={styles.red}>
              {rentPlan.getIn(['second_duration', 'sub_title'])}
              <span>推荐</span>
            </Flex>
            <p className={styles.gray}>{rentPlan.getIn(['second_duration', 'content'])}</p>
            <span className={styles.btn_blue} onClick={() => toggleModal(true)}>
              {rentPlan.getIn(['second_duration', 'other_title'])}
            </span>
            <Modal plans={rentPlan.get('second_plan')} visible={showModal} onClose={toggleModal} />
          </Item>
        </Flex>
      </div>
    </div>
  )
}

export default RentPlan
