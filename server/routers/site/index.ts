import { Router } from 'express'
import appdownload from './appdownload'
import appdownloadproceed from './appdownloadproceed'

const router = Router()

router.use('/appdownload', appdownload)
router.use('/appdownloadproceed', appdownloadproceed)

export default router
