import express from 'express'
import 'reflect-metadata'
import {createDatabase} from 'typeorm-extension'

import {AppDataSource} from './data-source'
import router from './routes'

const port = 5000
const app = express()

AppDataSource.initialize()
  .then(() => {
    app
      .use(express.json())
      .use(express.urlencoded({extended: true}))
      .use(router)
      .listen(port)
    createDatabase({ifNotExist: true})
    console.log(`Server started on port ${port}`)
  })
  .catch((error) => console.log(error))
