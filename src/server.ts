import fs from 'node:fs'
import express from 'express'
import multer from 'multer'

const upload = multer({dest: 'uploads/'})
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/upload_file', upload.array('file'), (req, res) => {
  console.log(req.body)
  console.log(req.files)
  res.json({message: 'Successfully uploaded files'})
})

app.post('/download_file', (req, res) => {
  console.log('download_file') //uploads/60fb9c0158bb16dc9db331370e58664c

  const path = 'uploads/60fb9c0158bb16dc9db331370e58664c'
  const file = fs.createReadStream(path)
  const filename = new Date().toISOString()
  res.setHeader(
    'Content-Disposition',
    'attachment: filename="' + filename + '"'
  )
  file.pipe(res)

  // res.json({message: 'Successfully download file'})
})

app.listen(5000, () => {
  console.log(`Server started...`)
})
