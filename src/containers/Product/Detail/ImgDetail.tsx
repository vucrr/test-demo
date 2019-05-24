import { LazyImage } from 'components'
import React from 'react'
import styles from './ImgDetail.less'
import TitleBox from './TitleBox'

// 产品参数
const Advantage = ({ productParam }: { productParam: any }) => {
  return (
    <div className={styles.advantage}>
      <div className={styles.title}>
        <TitleBox>{productParam.get('title')}</TitleBox>
      </div>
      <div className={styles.adv}>
        <ul className={styles.adv_item}>
          {productParam.get('list').map((item: any, index: any) => {
            return (
              <li key={index}>
                <div className={styles.icon} style={{ backgroundImage: `url(${item.get('icon')})` }} />
                <h4>{item.get('desc')}</h4>
                <span>{item.get('title')}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
const ImgDetail = ({ productParam, imageList }: { productParam: any; imageList: any }) => {
  return (
    <>
      {!!productParam.get('list').size && <Advantage productParam={productParam} />}
      <div className={styles.images_box} id="tabContent2">
        {imageList.map((item: any, index: number) => (
          <a key={index} href={item.get('link') || 'javascript:void(0);'}>
            <LazyImage src={item.get('image')} />
          </a>
        ))}
      </div>
    </>
  )
}

export default ImgDetail
