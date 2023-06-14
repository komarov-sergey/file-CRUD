import fs from 'node:fs'
import {Router} from 'express'
import {FileController, FileRepository} from './file.repository'
import {reverse} from 'node:dns'

export default Router()
  .post('/upload', async (req, res) => {
    //@ts-ignore
    const fileData = req.files

    const resultOrError = await FileController.uploadFile({
      name: fileData[0].originalname,
      extension: fileData[0].originalname
        .split('.')
        .reverse()
        .slice(0, -1)
        .join('.'),
      mimetype: fileData[0].mimetype,
      size: fileData[0].size,
      path: fileData[0].path,
    })

    res.json({message: resultOrError})
  })
  .get('/list', async (req, res) => {
    const {list_size, page} = req.query

    const resultOrError = await FileRepository.findAndCount({
      skip: Number(page),
      take: Number(list_size),
    })

    res.json({message: resultOrError})
  })

  .post('/download/:id', async (req, res) => {
    try {
      const {
        params: {id},
      } = req

      let fileFormDB = await FileRepository.findOneBy({id: Number(id)})

      if (!fileFormDB) {
        return Promise.reject('File not found.')
      }

      const path = `uploads/${fileFormDB.path}`
      const file = fs.createReadStream(path)
      const filename = new Date().toISOString()
      res.setHeader(
        'Content-Disposition',
        'attachment: filename="' + filename + '"'
      )
      file.pipe(res)
    } catch (e) {
      res.json({messsage: "Can't read file"})
    }
  })
