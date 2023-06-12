import fs from 'node:fs'
import {Router} from 'express'
import multer from 'multer'

const upload = multer({dest: 'uploads/'})

export default Router()
  .post('/upload', upload.array('file'), (req, res) => {
    console.log(req.body)
    res.json({message: 'Successfully uploaded files'})
  })

  .post('/download/:id', (req, res) => {
    console.log('download_file') //uploads/60fb9c0158bb16dc9db331370e58664c

    const path = 'uploads/60fb9c0158bb16dc9db331370e58664c'
    const file = fs.createReadStream(path)
    const filename = new Date().toISOString()
    res.setHeader(
      'Content-Disposition',
      'attachment: filename="' + filename + '"'
    )
    file.pipe(res)
  })
