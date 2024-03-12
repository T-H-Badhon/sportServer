import { Types } from 'mongoose'
import { TProduct } from './products.interfaces'
import { Product } from './products.model'
import { queryFilter } from './products.utilities'

const addProduct = async (productData: TProduct, id: Types.ObjectId) => {
  productData.addedBy = id

  const product = await Product.create(productData)

  return product
}
const updateProduct = async (updateData: TProduct, productId: string) => {
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    updateData,
    { new: true },
  )

  return product
}

const getProducts = async (query: Record<string, unknown>) => {
  if (query.searchTerm) {
    const products = await Product.find({
      name: { $regex: query.searchTerm, $options: 'i' },
    })

    return products
  }

  const filter = queryFilter(query)

  const products = await Product.find(filter)

  return products
}

const deleteOne = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)

  return result
}

const deleteProducts = async (ids: { ids: [Types.ObjectId] }) => {
  const result = await Product.deleteMany({ _id: { $in: ids } })

  return result
}

export const productServices = {
  addProduct,
  updateProduct,
  getProducts,
  deleteOne,
  deleteProducts,
}
