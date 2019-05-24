import { Router } from 'express'
import { appDownload } from '../../controllers/site/appdownload'
import { handler } from '../../utils/router'

const router = Router()

router.get('', handler(appDownload))

export default router
