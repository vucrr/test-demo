import { Flex } from 'antd-mobile'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Loading.less'

interface LoadingProps {
  loading: boolean
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      {loading && (
        <Flex className={styles.loading_box} justify="center">
          <img className={styles.loading} src={AssetImage.Common.Loading} />
        </Flex>
      )}
    </>
  )
}

export default Loading
