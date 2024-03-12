import httpStatus from 'http-status'
import { config } from '../../config/config'
import { AppError } from '../../errors/AppError'
import { hashedPassword } from '../../utilities/hashedPassword'
import { matchPassword } from '../../utilities/matchPassword'
import { TLoginUser, TUser, TtokenInfo } from './users.interfaces'
import { User } from './users.model'
import jwt from 'jsonwebtoken'

const registerUser = async (userData: TUser) => {
  userData.password = await hashedPassword(userData.password)

  const user = await User.create(userData)

  const result = await User.findById(user._id).select('-password -__v ')

  return result
}

const loginUser = async (loginCredential: TLoginUser) => {
  const { username, password } = loginCredential

  const loginUser = await User.findOne({ username }).select('+password')

  if (loginUser) {
    const isMatched = await matchPassword(password, loginUser.password)

    if (!isMatched) {
      throw new AppError(httpStatus.FORBIDDEN, 'password not matched')
    }

    const tokenInfo: TtokenInfo = {
      _id: loginUser._id,
      username: loginUser.username,
      role: loginUser.role,
    }
    if (loginUser.branch) {
      tokenInfo.branch = loginUser.branch
    }
    const token = jwt.sign(tokenInfo, config.access_secrate as string, {
      expiresIn: '1h',
    })

    const result = {
      token,
    }

    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }
}

const branches = async () => {
  const branches = await User.find({ role: 'seller' }).select('branch')

  return branches
}

export const userServices = {
  registerUser,
  loginUser,
  branches,
}
