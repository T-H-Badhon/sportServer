import { Router } from 'express'
import auth from '../../middlewares/auth'
import validate from '../../middlewares/ValidationFunction'
import { saleValidations } from './sales.validation'
import { saleControllers } from './sales.controllers'

const router = Router()

router.post(
  '/',
  auth('seller'),
  validate(saleValidations.saleValidationSchema),
  saleControllers.saleProduct,
)

router.get(
  '/sale-report/my-branch',
  auth('manager'),
  saleControllers.saleReportManager,
)
router.get('/sale-report/', auth('admin'), saleControllers.saleReportAdmin)

export const salesRoutes = router
