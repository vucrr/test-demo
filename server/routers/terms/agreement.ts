import { Router } from 'express'
import { query } from 'express-validator/check'
import { getAgreement, getElecontract } from '../../controllers/terms/agreement'
import { handler } from '../../utils/router'

const checkString = (value: string) => !value || value.length > 0
const router = Router()

router.get(
  '/public',
  [
    query('trade_no').custom(checkString),
    query('contract_product_id').custom(checkString),
    query('vas_id').custom(checkString),
  ],
  handler(getAgreement),
)

router.get(
  '/elecontract',
  [query('trade_no').exists(), query('sign').exists(), query('user_code').exists()],
  handler(getElecontract),
)

export default router
