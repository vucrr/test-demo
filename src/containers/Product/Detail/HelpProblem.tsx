import { Accordion } from 'antd-mobile'
import React from 'react'
import styles from './HelpProblem.less'
import TitleBox from './TitleBox'

export interface HelpProblemProps {
  commonQuestionList: any
}

const HelpProblem: React.FunctionComponent<HelpProblemProps> = ({ commonQuestionList }) => {
  return (
    <div className={styles.help_problem}>
      <TitleBox>常见问题</TitleBox>
      <Accordion accordion={true} defaultActiveKey="0" className={styles.accordion_box}>
        {commonQuestionList.map((item: any, index: number) => (
          <Accordion.Panel header={item.get('title')} key={index}>
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: item.get('content').replace(/(?!^)(?=\d\.)/gi, '<br/>') }}
            />
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  )
}

export default HelpProblem
