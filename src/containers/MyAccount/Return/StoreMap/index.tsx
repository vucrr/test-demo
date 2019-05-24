import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { getStore } from 'actions/myAccount/returnPhone'
import { Button, Container, Header, TabBar } from 'components'
import Router from 'next/router'
import React from 'react'
import Location from './Location'
import Picture from './Picture'
import styles from './index.less'

const StoreMap: NextSFC2<any> = (props: any) => {
  const containerProps = {
    renderHeader: <Header>查看地图</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }
  return (
    <Container {...containerProps}>
      <Location store={props.data} />
      <Picture store={props.data} />
      <div className={styles.btn} onClick={Router.back}>
        <Button type="primary" fixed={true}>
          好的
        </Button>
      </div>
    </Container>
  )
}

StoreMap.getInitialProps = async ({ store, query, req }: GetInitialPropsContext) => {
  const data = await store.dispatch(getStore(query.store_id, req))
  return { data }
}

export default StoreMap
