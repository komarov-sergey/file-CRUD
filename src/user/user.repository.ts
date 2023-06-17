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
            refreshToken: this.generateJWT(),
          }
        : {
            phone: id,
            password: await this.hashPassword(password),
            email: '',
            refreshToken: this.generateJWT(),
          }

      const newUser = await UserRepository.save(newUserTemplate)

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

      console.log({user})

      if (!this.isValidPassword(user.password, password)) {
        return Promise.reject('Id or passord is invalid.')
      }

      return Promise.resolve(this.generateJWT('sign'))
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  private static async hashPassword(password) {
    return crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex')
  }

  private static generateJWT(type = 'sign') {
    const today = new Date()
    const exp = new Date(today)

    type === 'sign'
      ? exp.setDate(today.getMinutes() + 10)
      : exp.setDate(today.getDate() + 1)

    return jwt.sign(
      {
        exp: exp.getTime() / 1000,
      },
      'secret'
    )
  }

  private static isValidPassword(hashPassword, password) {
    console.log(this.salt)
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex')

    return hash === hashPassword
  }
}
