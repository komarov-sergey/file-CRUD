import {Router} from 'express'

import fileRoutes from './file/file.routes'

export default Router().use(['/file', '/files'], fileRoutes)
