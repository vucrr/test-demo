import { Router } from 'express'
import { receiveCreditEntryData } from '../../controllers/assess/creditEntrydata'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', auth, handler(receiveCreditEntryData))

export default router
