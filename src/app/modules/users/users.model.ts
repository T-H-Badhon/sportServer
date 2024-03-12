import mongoose, { Schema } from 'mongoose'
import { TUser } from './users.interfaces'

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'seller'],
  },
  branch: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const User = mongoose.model('user', userSchema)
