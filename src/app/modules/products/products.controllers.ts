import { Request, Response } from 'express'
import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { productServices } from './products.services'

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body
  const id = req.user._id
  const result = await productServices.addProduct(productData, id)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product added successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updateData = req.body

  const productId = req.params.productId
  const result = await productServices.updateProduct(updateData, productId)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product updated successfully',
    data: result,
  })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const result = await productServices.getProducts(query)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Products fetched successfully',
    data: result,
  })
})

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  const result = await productServices.deleteOne(productId)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product deleted successfully',
    data: result,
  })
})

const deleteProducts = catchAsync(async (req: Request, res: Response) => {
  const ids = req.body.ids

  const result = await productServices.deleteProducts(ids)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Products deleted successfully',
    data: result,
  })
})

export const productControllers = {
  addProduct,
  updateProduct,
  getProduct,
  deleteOne,
  deleteProducts,
}
