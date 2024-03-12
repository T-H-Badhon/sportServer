import mongoose, { Schema } from 'mongoose'
import { TProduct } from './products.interfaces'

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  sportsType: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
})

export const Product = mongoose.model('product', productSchema)
