import {Router} from 'express'
import multer from 'multer'

import fileRoutes from './file/file.routes'
import userRoutes from './user/user.routes'

const upload = multer({dest: 'uploads/'})

export default Router()
  .use(['/file', '/files'], upload.array('file'), fileRoutes)
  .use('/', userRoutes)
