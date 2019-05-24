import { Router } from 'express'
import { query } from 'express-validator/check'
import { listPrivilege } from '../../../controllers/account/service/privilege'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', [query('contract_no').exists()], handler(listPrivilege))

export default router
