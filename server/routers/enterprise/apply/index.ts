import { Router } from 'express'
import { body } from 'express-validator/check'
// import { query } from 'express-validator/check'
import { privileges, resultStatus, submitBind, verifyEmail } from '../../../controllers/enterprise/apply'
import { handler } from '../../../utils/router'

const router = Router()

const checkString = (value: string) => !value || value.length > 0

router.get('/guide', [], handler(privileges))

router.get('/result-status', [], handler(resultStatus))

router.post('/verify-email', [body('email').exists()], handler(verifyEmail))

router.post(
  '/bind-enterprise',
  [
    body('email').exists(),
    body('verify_code').exists(),
    body('verify_code').custom(checkString),
    body('idcard').custom(checkString),
    body('employee_card').custom(checkString),
  ],
  handler(submitBind),
)

export default router
