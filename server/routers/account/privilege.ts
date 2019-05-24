import { Request, Router } from 'express'
import { query } from 'express-validator/check'
import { exchangeCode, getPrivilege, listPrivileges } from '../../controllers/account/privilege'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

const parseGetPrivilegeReq = (req: Request) => ({
  headers: req.headers,
  query: {
    user_priv_id: req.query.id,
    type: req.query.type,
  },
})

router.get('/', auth, [query('id').exists(), query('type').exists()], handler(getPrivilege, parseGetPrivilegeReq))
router.get('/list', auth, handler(listPrivileges))
router.get('/code', auth, handler(exchangeCode))

export default router
