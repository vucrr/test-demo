import { Flex } from 'antd-mobile'
import React, { useState } from 'react'
import { Modal } from './RentPlan'
import styles from './RentProcess.less'
import TitleBox from './TitleBox'

const Item = Flex.Item

export interface RentProcessProps {
  rentProcess: any
  rentPlan: any
}

const RentProcess: React.FunctionComponent<RentProcessProps> = ({ rentProcess, rentPlan }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleModal = (showModal: boolean) => {
    setShowModal(showModal)
  }

  return (
    <div className={styles.rent_process} id="tabContent1">
      <TitleBox>{rentProcess.get('title')}</TitleBox>
      <div className={styles.list}>
        {rentProcess.get('list').map((item: any, index: number) => {
          return (
            <Flex className={styles.item} align="start" key={index}>
              <Flex className={styles.icon_wrap} justify="center">
                <div className={styles.icon} style={{ backgroundImage: `url(${item.get('icon')})` }} />
              </Flex>
              <Item>
                <h5>{item.get('title')}</h5>
                <p dangerouslySetInnerHTML={{ __html: item.get('content').replace(/(?!^)(?=•)/gi, '<br/>') }} />
                {item.get('tips') && (
                  <span className={styles.btn_blue} onClick={() => toggleModal(true)}>
                    {item.get('tips')}
                  </span>
                )}
              </Item>
            </Flex>
          )
        })}
      </div>
      <Modal visible={showModal} onClose={toggleModal} plans={rentPlan.get('second_plan')} />
    </div>
  )
}

export default RentProcess
