import React from 'react'
import styles from './DiscountPromotion.less'
import DiscountsBox from './DiscountsBox'
import PromotionBox from './PromotionBox'

export interface DiscountPromotionProps {
  discountList: any
  promotionList: any
}

const DiscountPromotion: React.FunctionComponent<DiscountPromotionProps> = ({ discountList, promotionList }) => {
  const hasDiscount = !!discountList.count()
  const hasPromotion = !!promotionList.count()
  if (!hasDiscount && !hasPromotion) {
    return null
  }
  return (
    <div className={styles.list_box}>
      {hasDiscount && <DiscountsBox list={discountList} />}
      {hasPromotion && <PromotionBox list={promotionList} />}
    </div>
  )
}

export default DiscountPromotion
