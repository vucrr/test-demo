import { Router } from 'express'
import { query } from 'express-validator/check'
import { getInvoiceApply } from '../../../controllers/account/receipt/form'
import { getInvoice, getInvoiceCancel, getInvoiceDetail } from '../../../controllers/account/receipt/invoice'
import { getInvoiceEmail } from '../../../controllers/account/receipt/sendEmail'
import { auth } from '../../../middlewares/auth'
import { handler } from '../../../utils/router'

const checkString = (value: string) => !value || value.length > 0
const router = Router()

router.get('/', [query('contract_no').exists()], auth, handler(getInvoice))
router.get('/cancel', [query('contract_no').exists()], auth, handler(getInvoiceCancel))
router.get(
  '/detail',
  [query('contract_no').exists(), query('current_page').custom(checkString), query('page_size').custom(checkString)],
  auth,
  handler(getInvoiceDetail),
)
router.get('/email', [query('email').exists(), query('record_id').exists()], auth, handler(getInvoiceEmail))
const validations = [
  query('contract_no').exists(),
  query('invoice_type').exists(),
  query('invoice_title').exists(),
  query('taxer_no').custom(checkString),
  query('email').exists(),
  query('open_type').exists(),
]
router.get('/apply', validations, auth, handler(getInvoiceApply))
export default router
