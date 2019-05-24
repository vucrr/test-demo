import { Router } from 'express'
import { checkToken, checkTradeDone, getNavIcons, sendDingTalkError, uploadToOSS } from '../controllers/common'
import { handler } from '../utils/router'

const router = Router()

router.post('/upload', handler(uploadToOSS))

// body redirect_url
// body utm_source
router.post('/jsapi/checkToken', [], handler(checkToken))

router.post('/dingtalk/send', [], handler(sendDingTalkError))

router.get('/getNavIcons', [], handler(getNavIcons))

router.get('/checkTradeDone', [], handler(checkTradeDone))

export default router
