import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'
import { userValitdations } from './users.validation'
import { userControllers } from './users.controllers'

const router = Router()

router.post(
  '/register',
  validate(userValitdations.userValidationSchema),
  userControllers.registerUser,
)
router.post(
  '/login',
  validate(userValitdations.loginCredentialValidationSchema),
  userControllers.loginUser,
)

router.get('/branches', userControllers.branches)

export const userRoutes = router
