import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'
import { productValidations } from './products.validation'
import { productControllers } from './products.controllers'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/add-product',
  auth('admin', 'manager'),
  validate(productValidations.productValidationSchema),
  productControllers.addProduct,
)
router.patch(
  '/update-product/:productId',
  auth('admin', 'manager'),
  validate(productValidations.UpdateProductValidationSchema),
  productControllers.updateProduct,
)

router.get(
  '/',
  auth('admin', 'manager', 'seller'),
  productControllers.getProduct,
)
router.delete(
  '/delete',
  auth('admin', 'manager'),
  productControllers.deleteProducts,
) // user just marks products and seleted products ids are added to deleteIdsArray automatically . So , I feel no need to validate this array
export const productRoutes = router
