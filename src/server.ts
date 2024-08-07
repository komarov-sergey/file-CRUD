import express from 'express'
import 'reflect-metadata'
import 'dotenv/config'

import {AppDataSource} from './data-source'
import router from './routes'

const app = express()

AppDataSource.initialize()
  .then(() => {
    app
      .use(express.json())
      .use(express.urlencoded({extended: true}))
      .use(router)
      .listen(process.env.HOST_PORT)
    console.log(`Server started on port ${process.env.HOST_PORT}`)
  })
  .catch((error) => console.log(error))
