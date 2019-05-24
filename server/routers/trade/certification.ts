import { Router } from 'express'
import {
  fetchCertifyForm,
  getCertifyType,
  getZmfaceCertifyResult,
  getZmxyCertifyResult,
  postCertifyUrl,
  postUserIdentity,
} from '../../controllers/trade/certification'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.post('/form', auth, handler(fetchCertifyForm))
router.get('/result/zmface', auth, handler(getZmfaceCertifyResult))
router.get('/result/zmxy', auth, handler(getZmxyCertifyResult))
router.post('/save', auth, handler(postUserIdentity))
router.get('/getType', auth, handler(getCertifyType))
router.post('/getUrl', auth, handler(postCertifyUrl))

export default router
