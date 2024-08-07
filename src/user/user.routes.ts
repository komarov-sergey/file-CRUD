import {Router} from 'express'
import jwt from 'jsonwebtoken'
import R from 'ramda'

import {UserController, UserRepository} from './user.repository'
import {handleResponsePromise} from '../helpers'

export default Router()
  .post('/signup', async ({body}, res) =>
    UserController.signupUser(body)
      .then((data) => res.json(data))
      .catch((e) => {
        res.status(422).json({errors: {body: [e.toString()]}})
      })
  )

  .post('/signin', async (req, res) => {
    const {
      body: {id, password},
    } = req

    await handleResponsePromise(UserController.signinUser(id, password), res)
  })
  .post('/signin/new_token', async (req, res) => {
    const {
      body: {token},
    } = req
    await handleResponsePromise(UserController.updateToken(token), res)
  })
  .get('/info', (req, res) => {
    try {
      const {
        body: {token},
      } = req

      jwt.verify(token, process.env.SECRET)

      res.json({id: 'test_id'})
    } catch (e) {
      console.log(e)
      res.json({message: `Can't get user id`})
    }
  })
  .get('/logout', async (req, res) => {
    const {
      body: {id},
    } = req

    try {
      let user = await UserRepository.findOneBy({id})

      if (!user) {
        return Promise.reject('User not found')
      }

      user.refreshToken = null

      await UserRepository.save({
        ...user,
      })

      res.json({message: `User logut`})
    } catch (e) {
      console.log(e)
      res.json({message: `User logut`})
    }
  })
