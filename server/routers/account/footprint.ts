import { Router } from 'express'
import { receiveFootprint, receiveFootprintList } from '../../controllers/account/footprint'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', auth, handler(receiveFootprint))
router.get('/list', auth, handler(receiveFootprintList))

export default router
