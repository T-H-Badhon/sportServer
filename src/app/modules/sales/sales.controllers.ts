import { Request, Response } from 'express'
import catchAsync from '../../utilities/catchAsync'
import { saleServices } from './sales.services'
import response from '../../utilities/response'

const saleProduct = catchAsync(async (req: Request, res: Response) => {
  const saleData = req.body

  const { _id, branch } = req.user

  const result = await saleServices.saleProduct(saleData, _id, branch)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product sold successfully',
    data: result,
  })
})

const saleReportManager = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const branch = req.user.branch

  const result = await saleServices.saleReportManager(query, branch)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'sale report fetch successfully',
    data: result,
  })
})
const saleReportAdmin = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

  const result = await saleServices.saleReportAdmin(query)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'sale report fetch successfully',
    data: result,
  })
})

export const saleControllers = {
  saleProduct,
  saleReportManager,
  saleReportAdmin,
}
