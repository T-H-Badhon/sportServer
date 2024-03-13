import mongoose, { Types } from 'mongoose'
import { TSale } from './sales.interface'
import { Sale } from './sales.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { Product } from '../products/products.model'
import { filterGenerator } from './sales.utilities'

const saleProduct = async (
  saleData: TSale,
  userId: Types.ObjectId,
  branch: string,
) => {
  saleData.saleBy = userId
  saleData.date = new Date(saleData.date)
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const product = await Product.findById({ _id: saleData.productId })

    if (product && product.quantity >= saleData.sellQuantity) {
      const currentQuantity = product.quantity - saleData.sellQuantity
      if (currentQuantity == 0) {
        await Product.findByIdAndDelete(saleData.productId, { session })
      } else {
        const newInventory = await Product.findByIdAndUpdate(
          saleData.productId,
          { quantity: currentQuantity },
          { new: true, session },
        )

        if (!newInventory?.quantity) {
          throw new AppError(httpStatus.BAD_REQUEST, 'sale failed!')
        }
      }
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'Low Inventory')
    }

    saleData.date = new Date(saleData.date)
    saleData.branch = branch

    const sale = await Sale.create([saleData], { session })

    if (!sale.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'sale Failed!')
    }
    await session.commitTransaction()
    await session.endSession()

    return sale[0]
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Sale Failed!')
  }
}

const saleReportManager = async (
  query: Record<string, unknown>,
  branch: string,
) => {
  query.branch = branch
  const filter = filterGenerator(query)

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: 'products', // The name of the Product collection
        localField: 'productId', // Field from the Sale collection
        foreignField: '_id', // Field from the Product collection
        as: 'productDetails', // The alias for the joined data
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: null,
        sales: {
          $push: {
            productName: '$productDetails.name',
            buyer: '$buyerName',
            date: '$date',
          },
        },
        totalSaleValue: {
          $sum: { $multiply: ['$sellQuantity', '$productDetails.price'] },
        },
        totalQuantity: { $sum: '$sellQuantity' },
      },
    },
  ])

  return result[0]
}
const saleReportAdmin = async (query: Record<string, unknown>) => {
  const filter = filterGenerator(query)

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: 'products', // The name of the Product collection
        localField: 'productId', // Field from the Sale collection
        foreignField: '_id', // Field from the Product collection
        as: 'productDetails', // The alias for the joined data
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: null,
        sales: {
          $push: {
            productName: '$productDetails.name',
            buyer: '$buyerName',
            branch: '$branch',
            date: '$date',
          },
        },
        totalSaleValue: {
          $sum: { $multiply: ['$sellQuantity', '$productDetails.price'] },
        },
        totalQuantity: { $sum: '$sellQuantity' },
      },
    },
  ])

  return result[0]
}

export const saleServices = {
  saleProduct,
  saleReportManager,
  saleReportAdmin,
}
