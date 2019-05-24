import { Router } from 'express'
// import { body, query } from 'express-validator/check'
import { checkBtnStatus, getList } from '../../../controllers/account/service/list'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', handler(getList))
router.get('/checkBtnStatus', handler(checkBtnStatus))

export default router
