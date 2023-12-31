import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'

import {AppDataSource} from '../data-source'
import {User} from './user.entity'

export const UserRepository = AppDataSource.getRepository(User)

export class UserController {
  public static salt = process.env.SALT
  public constructor() {}

  public static async signupUser(id, password) {
    try {
      const isEmail = id.includes('a')

      const newUserTemplate = isEmail
        ? {
            email: id,
            password: await this.hashPassword(password),
            phone: '',
          }
        : {
            phone: id,
            password: await this.hashPassword(password),
            email: '',
          }

      const newUser = await UserRepository.save(newUserTemplate)
      newUser.refreshToken = this.generateJWT('refresh', newUser.id)
      await UserRepository.save(newUser)

      return Promise.resolve(newUser)
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  public static async signinUser(id, password) {
    try {
      const isEmail = id.includes('a')

      const user = isEmail
        ? await UserRepository.findOneBy({email: id})
        : await UserRepository.findOneBy({phone: id})

      if (!user) {
        return Promise.reject('No user found.')
      }

      if (!this.isValidPassword(user.password, password)) {
        return Promise.reject('Id or passord is invalid.')
      }

      return Promise.resolve(this.generateJWT('sign', user.id))
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  public static async updateToken(token) {
    try {
      jwt.verify(token, process.env.SECRET)

      const user = await UserRepository.findOneBy({refreshToken: token})

      if (!user) Promise.reject('User not found.')

      return Promise.resolve(this.generateJWT('sign', user.id))
    } catch (e) {
      console.log(e)
      return Promise.reject(`Can't update token.`)
    }
  }

  private static async hashPassword(password) {
    return crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex')
  }

  private static generateJWT(type = 'sign', id) {
    const today = new Date()
    const exp = new Date(today)

    type === 'sign'
      ? exp.setDate(today.getMinutes() + 10)
      : exp.setDate(today.getDate() + 1)

    return jwt.sign(
      {
        exp: exp.getTime() / 1000,
        id,
      },
      process.env.SECRET
    )
  }

  private static isValidPassword(hashPassword, password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex')

    return hash === hashPassword
  }
}
