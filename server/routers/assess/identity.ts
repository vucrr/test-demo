import { Router } from 'express'
import { postIdentity } from '../../controllers/assess/identity'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.post('/', auth, handler(postIdentity))

export default router
