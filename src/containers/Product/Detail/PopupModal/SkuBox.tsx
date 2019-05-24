import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon } from 'components'
import withSource, { SourceProps } from 'components/withSource'
import React, { useEffect, useRef } from 'react'
import { compose } from 'redux'
import styles from './SkuBox.less'

interface SkuBoxProps {
  property: any
  onDetailActions: any
}

const SkuBox: React.FunctionComponent<SkuBoxProps & SourceProps> = props => {
  const { utm, property, onDetailActions } = props

  const info = property.get('info')
  const curRent = property.get('curRent')
  const propertyList = property.get('propertyList')
  const selectedList = property.get('selectedList')

  const serviceRef = useRef(null)

  useEffect(
    () => {
      const serviceEl: any = serviceRef.current
      if (curRent && serviceEl) {
        serviceEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [curRent],
  )

  const handleChange = ({ itemList, item }: any) => {
    onDetailActions.changePropertyItem({
      pid: itemList.get('id'),
      id: item.get('id'),
      selected: item.get('selected'),
    })
  }

  const computeProductImage = () => {
    const colorImageList = info.get('color_image_list')
    const defaultImage = info.get('product_image')

    const colorProperty = propertyList.toJS().find((item: any) => {
      return item.name === '颜色'
    })

    if (!colorProperty || !selectedList.get(colorProperty.id)) return defaultImage

    const colorImage = colorImageList.toJS().find((item: any) => {
      return +item.color_id === +selectedList.get(colorProperty.id)
    })

    return colorImage ? colorImage.url : defaultImage
  }

  const renderItemButton = ({ itemList, item }: any) => {
    // 如果具有url选项 则
    if (item.get('url')) {
      return (
        <div className={styles.btn_with_url} key={item.get('id')}>
          <Button
            activeStyle={false}
            onClick={() => handleChange({ itemList, item })}
            inline={true}
            disabled={item.get('disabled')}
            className={classnames(styles.btn_item, item.get('selected') && styles.active)}
          >
            <span>{item.get('value')}</span>
          </Button>
          <a href={utm.get('isCmblife') ? '/product/insurance' : item.get('url')}>
            <Icon className={styles.icon} type={require('svg/question-circle.svg')} />
          </a>
        </div>
      )
    }

    return (
      <Button
        activeStyle={false}
        key={item.get('id')}
        onClick={() => handleChange({ itemList, item })}
        inline={true}
        disabled={item.get('disabled')}
        className={classnames(styles.btn_item, item.get('selected') && styles.active)}
      >
        <span>{item.get('value')}</span>
      </Button>
    )
  }

  const renderInfoList = () => {
    let isSelected = false
    const labelsList: JSX.Element[] = []

    const selectedList = propertyList.map((itemList: any, index: number) => {
      labelsList.push(<span key={index}>{(index === 0 ? '请选择' : '') + itemList.get('name')}</span>)

      return itemList.get('value_list').map((item: any) => {
        if (!item.get('selected')) return null
        isSelected = true
        return <span key={item.get('id')}>{item.get('value')}</span>
      })
    })

    return isSelected ? selectedList : labelsList
  }

  return (
    <>
      <div className={classnames(styles.popup_body, styles.product)}>
        <Flex className={styles.info_box} align="start">
          <div className={styles.image} style={{ backgroundImage: `url(${computeProductImage()})` }} />
          <div className={styles.left}>
            <div className={styles.title}>{info.get('product_title')}</div>
            <div className={styles.info}>{renderInfoList()}</div>
          </div>
        </Flex>
        {propertyList.map((itemList: any) => (
          <Flex className={styles.item_box} direction="column" align="start" key={itemList.get('id')}>
            <span className={styles.label}>{itemList.get('name')}</span>
            <div className={styles.item_list}>
              {itemList.get('value_list').map((item: any) => renderItemButton({ itemList, item }))}
            </div>
          </Flex>
        ))}
        {curRent ? (
          <div className={styles.service} ref={serviceRef}>
            <div className={styles.label}>
              {info.get('service_title')}
              <span>{curRent.get('service_price')}</span>
              <a href={utm.get('isCmblife') ? '/product/insurance' : '/product/insurance'}>
                <Icon className={styles.icon} type={require('svg/question-circle.svg')} />
              </a>
            </div>
            <div className={styles.info}>{info.get('service_content')}</div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default compose(withSource)(SkuBox)
