import classnames from 'classnames'
import { Icon } from 'components'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './ServiceBox.less'

interface ServiceBoxItemProps {
  selected: boolean
  open: boolean
  onToggleDes: Function
  onToggleSelect: Function
  index: number
  info: {
    title: string
    desc: string
    price: string
    image: string
    bigImage: string
  }
}

const ServiceBoxItem: React.FunctionComponent<ServiceBoxItemProps> = props => {
  const { open, onToggleDes, onToggleSelect, index, info, selected } = props

  const [desHeight, setDesHeight] = useState(0)
  const desBoxRef = useRef(null)

  useEffect(
    () => {
      const desBoxEl: any = desBoxRef.current

      if (!desBoxEl) return

      if (open) {
        setDesHeight(desBoxEl.scrollHeight)
      } else {
        setDesHeight(0)
      }
    },
    [open],
  )

  let closeBigImage: Function = () => undefined

  const handleToggleDes = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onToggleDes(index)
  }

  const handleToggleSelect = () => {
    onToggleSelect({ index: index })
  }

  const handleToggleBigImage = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    closeBigImage = showBigImage(info.bigImage)
  }

  useEffect(() => {
    return () => {
      closeBigImage()
    }
  })

  return (
    <div className={styles.item} onClick={handleToggleSelect}>
      <div className={styles.left}>
        <div className={styles.price}>¥{info.price.split('.')[0]}</div>
        <div className={styles.info}>
          <div className={styles.name}>
            {info.title.length > 23 ? `${info.title.slice(0, 23)}...` : info.title}
            <span className={classnames({ [styles.open]: open })} onClick={handleToggleDes}>
              详情
              <Icon className={styles.icon} type={require('svg/arrow-left.svg')} />
            </span>
          </div>
          <div
            className={classnames(styles.des_box, { [styles.open]: open })}
            style={{ height: desHeight }}
            ref={desBoxRef}
          >
            {info.desc}
            {info.image && (
              <div
                className={styles.image}
                onClick={handleToggleBigImage}
                style={{ backgroundImage: `url(${info.image})` }}
              />
            )}
          </div>
        </div>
      </div>
      {selected ? (
        <Icon className={styles.radio_selected} type={require('svg/right-circle-o.svg')} />
      ) : (
        <div className={styles.radio} />
      )}
    </div>
  )
}

interface ServiceBoxProps {
  property: any
  onDetailActions: any
}

const ServiceBox: React.FunctionComponent<ServiceBoxProps> = props => {
  const { property, onDetailActions } = props
  const vasList = property.get('vasList')

  const [showDesIndex, setShowDesIndex] = useState(null)

  const toggleShowDesIndex = (index: number & null) => {
    if (index === showDesIndex) {
      setShowDesIndex(null)
    } else {
      setShowDesIndex(index)
    }
  }

  return (
    <>
      <div className={classnames(styles.popup_body, styles.services)}>
        <div className={styles.title}>以下增值服务可任意选择搭配</div>
        <div className={styles.list}>
          {vasList.map((service: any, index: number) => {
            const {
              image: { small_image: image, big_image: bigImage },
              price,
              title,
              desc,
              selected,
            } = service.toJS()

            return (
              <ServiceBoxItem
                key={index}
                index={index}
                selected={!!selected}
                open={showDesIndex === index}
                info={{ title, price, desc, image, bigImage }}
                onToggleDes={toggleShowDesIndex}
                onToggleSelect={onDetailActions.changeVasListSelected}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

function showBigImage(imageSrc: string): Function {
  const div: any = document.createElement('div')
  document.body.appendChild(div)

  function close() {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  ReactDOM.render(
    <div className={styles.big_image} onClick={close}>
      <img src={imageSrc} alt="" />
    </div>,
    div,
  )

  return close
}

export default ServiceBox
