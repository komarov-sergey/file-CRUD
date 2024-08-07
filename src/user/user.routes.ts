import {Router} from 'express'
import jwt from 'jsonwebtoken'

import {UserService, UserRepository} from './user.repository'
import auth from '../middleware/auth'

export default Router()
  .post('/signup', async ({body}, res) =>
    UserService.signupUser(body)
      .then((data) => res.json(data))
      .catch((e) => res.status(422).json({errors: {body: [e.toString()]}}))
  )
  .post('/signin', async ({body}, res) =>
    UserService.loginUser(body)
      .then((data) => res.json(data))
      .catch((e) => res.status(422).json({errors: {body: [e.toString()]}}))
  )
  .post('/signin/new_token', async ({body}, res) =>
    UserService.updateToken(body)
      .then((data) => res.json(data))
      .catch((e) => res.status(422).json({errors: {body: [e.toString()]}}))
  )
  .get('/logout', async ({body}, res) =>
    UserService.loguoutUser(body)
      .then((data) => res.json(data))
      .catch((e) => res.status(422).json({errors: {body: [e.toString()]}}))
  )
