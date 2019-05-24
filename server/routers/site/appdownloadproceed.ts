import { Router } from 'express'
import { appDownloadProceed } from '../../controllers/site/appdownload'
import { handler } from '../../utils/router'

const router = Router()

router.get('', handler(appDownloadProceed))

export default router
