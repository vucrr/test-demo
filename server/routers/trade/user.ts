import { Router } from 'express'
import { getUser, saveUser } from '../../controllers/trade/user'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.post('', auth, handler(saveUser))
router.get('', auth, handler(getUser))

export default router
