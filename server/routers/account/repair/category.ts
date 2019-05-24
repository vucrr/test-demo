import { Router } from 'express'
import { query } from 'express-validator/check'
import { getCategory } from '../../../controllers/account/repair/category'
import { auth } from '../../../middlewares/auth'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', auth, [query('trade_no').exists()], handler(getCategory))

export default router
