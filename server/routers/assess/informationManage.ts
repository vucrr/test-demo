import { Router } from 'express'
import { receiveInformationData } from '../../controllers/assess/informationManage'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', auth, handler(receiveInformationData))

export default router
