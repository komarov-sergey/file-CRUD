import jwt from 'jsonwebtoken'

import {UserRepository} from '../user/user.repository'
import {AuthError} from '../errors'

export default async function (req, res, next) {
  const token =
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
      ? req.headers.authorization.split(' ')[1]
      : ''

  if (!token) res.json({error: new AuthError('Invalid token')})

  if (token) {
    try {
      jwt.verify(token, process.env.SECRET)
      const tokenData = jwt.decode(token)

      const user = await UserRepository.findOneBy({id: tokenData.id})

      if (!user) throw new AuthError('Invalid token')

      if (!user.refreshToken)
        res.json({error: new AuthError('Session expired pls login again')})
    } catch (e) {
      res.json({error: new AuthError('Invalid token')})
    }
  }

  await next()
}
