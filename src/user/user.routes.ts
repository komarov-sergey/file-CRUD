import {Router} from 'express'
import {UserController} from './user.repository'

export default Router()
  .post('/signup', async (req, res) => {
    const {
      body: {id, password},
    } = req

    const newUserOrError = await UserController.signupUser(id, password)

    res.json({messsage: newUserOrError})
  })
  .post('/signin', async (req, res) => {
    const {
      body: {id, password},
    } = req

    const userOrError = await UserController.signinUser(id, password)

    res.json({messsage: userOrError})
  })
  .post('/signin/new_token', async (req, res) => {
    const tokenOrError = await UserController.updateToken()

    res.json({messsage: tokenOrError})
  })
