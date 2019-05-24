import { Router } from 'express'
import { body, query } from 'express-validator/check'
import { createForm, getForm } from '../../../controllers/account/repair/category'
import { auth } from '../../../middlewares/auth'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', auth, [query('trade_no').exists(), query('type').exists()], handler(getForm))

const validations = [
  body('trade_no').exists(),
  body('reason').exists(),
  body('remark').exists(),
  body('with_spare_machine').exists(),
]
router.post('/', auth, validations, handler(createForm))

export default router
