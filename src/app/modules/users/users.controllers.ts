import catchAsync from '../../utilities/catchAsync'
import { Request, Response } from 'express'
import response from '../../utilities/response'
import { userServices } from './users.sevices'

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await userServices.registerUser(userData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginCredential = req.body

  const result = await userServices.loginUser(loginCredential)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: result,
  })
})
const branches = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.branches()

  response(res, {
    success: true,
    statusCode: 200,
    message: 'branches fetch successfully',
    data: result,
  })
})

export const userControllers = {
  registerUser,
  loginUser,
  branches,
}
