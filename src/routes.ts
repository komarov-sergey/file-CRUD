import {Router} from 'express'
import multer from 'multer'

import errorHandler from './middleware/err'
import fileRoutes from './file/file.routes'
import userRoutes from './user/user.routes'

const upload = multer({dest: 'uploads/'})

export default Router()
  .use(errorHandler)
  .get("/healthcheck", (req, res) => {
    res.sendStatus(200)
  })
  .use(['/file', '/files'], upload.array('file'), fileRoutes)
  .use('/', userRoutes)
