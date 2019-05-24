import { Router } from 'express'
import { guideOldUser } from '../../controllers/activitys/guideolduser'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', handler(guideOldUser))

export default router
