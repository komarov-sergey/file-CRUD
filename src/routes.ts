import { Router } from 'express'
import multer from 'multer'

import errorHandler from './middleware/err'
import fileRoutes from './file/file.route'
import userRoutes from './user/user.route'
import reportRoutes from './report/report.route'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

export default Router()
  .use(errorHandler)
  .get('/healthcheck', (_, res) => {
    res.sendStatus(200)
  })
  .use(['/file', '/files'], upload.array('file'), fileRoutes)
  .use('/', userRoutes)
  .use('/', reportRoutes)
