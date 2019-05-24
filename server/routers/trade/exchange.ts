import { Router } from 'express'
import { body, query } from 'express-validator/check'
import {
  getCheckTradeCondition,
  getReplaceStatus,
  getReturnInfo,
  getStoreInfo,
  saveReturnInfo,
} from '../../controllers/trade/exchange'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const checkString = (value: string) => !value || value.length > 0
const router = Router()

router.post(
  '',
  auth,
  [
    body('contract_product_id')
      .exists()
      .isInt(),
    body('old_trade_no').custom(checkString),
  ],
  handler(getReplaceStatus),
)

router.post(
  '/getReturn',
  auth,
  [
    body('trade_type')
      .exists()
      .isInt(),
    body('old_trade_no')
      .exists()
      .isInt(),
  ],
  handler(getReturnInfo),
)

router.post(
  '/saveReturn',
  auth,
  [
    body('contract_product_id')
      .exists()
      .isInt(),
    body('old_trade_no')
      .exists()
      .isInt(),
    // body('new_debit_date').custom(checkString),
    // body('old_debit_date').custom(checkString),
    // body('store_id').custom(checkString),
    // body('return_type').custom(checkString),
    // body('vas_id').custom(checkString),
    // body('coop_no').custom(checkString),
  ],
  handler(saveReturnInfo),
)

router.get(
  '/store',
  auth,
  [
    query('ahs_store_id')
      .exists()
      .isInt(),
  ],
  handler(getStoreInfo),
)

router.get('/checkTradeCondition', auth, handler(getCheckTradeCondition))

export default router
