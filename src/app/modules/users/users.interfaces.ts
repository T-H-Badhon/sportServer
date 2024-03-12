import { Types } from 'mongoose'

export type TUser = {
  name: string
  username: string
  role: 'admin' | 'manager' | 'seller'
  branch?: string
  email: string
  password: string
}

export type TLoginUser = {
  username: string
  password: string
}

export type TtokenInfo = {
  _id: Types.ObjectId
  username: string
  branch?: string
  role: 'admin' | 'manager' | 'seller'
}
