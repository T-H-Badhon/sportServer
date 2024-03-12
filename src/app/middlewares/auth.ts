import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utilities/catchAsync'
import { AppError } from '../errors/AppError'
import { config } from '../config/config'

import { AuthError } from '../errors/AuthError'
import { User } from '../modules/users/users.model'

const auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    let decoded
    try {
      decoded = jwt.verify(token, config.access_secrate as string) as JwtPayload
    } catch (err) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    const { _id, role } = decoded as JwtPayload

    if (!roles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!')
    }

    const loginUser = await User.findById(_id)

    if (!loginUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
