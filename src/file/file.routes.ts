// @ts-nocheck
import fs from 'node:fs'
import { Router } from 'express'
import R from 'ramda'

import { FileService, FileRepository } from './file.repository'
import auth from '../middleware/auth'

export default Router()
  .post('/upload', auth, async ({ files }, res) => {
    const { originalname: name, mimetype, size, path } = R.head(files)
    const getExtension = R.pipe(
      R.split('.'),
      R.reverse(),
      R.slice(0, -1),
      R.join('.')
    )

    return FileService.uploadFile({
      name,
      extension: getExtension(name),
      mimetype,
      size,
      path,
    })
      .then(data => res.json(data))
      .catch(e => res.status(422).json({ errors: { body: [e.toString()] } }))
  })
  .get('/list', auth, async (req, res) => {
    const { list_size, page } = req.query

    const resultOrError = await FileRepository.findAndCount({
      skip: Number(page),
      take: Number(list_size),
    })

    res.json({ message: resultOrError })
  })
  .delete('/delete/:id', auth, async (req, res) => {
    const {
      params: { id },
    } = req

    try {
      let fileFormDB = await FileRepository.findOneBy({ id: Number(id) })
      fs.unlinkSync(`${process.cwd()}/${fileFormDB.path}`)

      res.json({ messsage: 'File was deleted.' })
    } catch (e) {
      res.json({ messsage: "Can't delete file." })
    }
  })
  .put('/update/:id', auth, async (req, res) => {
    const {
      params: { id },
    } = req

    try {
      let fileFormDB = await FileRepository.findOneBy({ id: Number(id) })
      console.log({ fileFormDB })
      //@ts-ignore
      const fileData = req.files

      const updateFileData = {
        name: fileData[0].originalname,
        extension: fileData[0].originalname
          .split('.')
          .reverse()
          .slice(0, -1)
          .join('.'),
        mimetype: fileData[0].mimetype,
        size: fileData[0].size,
        path: fileData[0].path,
      }

      await FileRepository.update({ id: Number(id) }, updateFileData)

      res.json({ messsage: 'File was updated.' })
    } catch (e) {
      res.json({ messsage: "Can't update file." })
    }
  })
  .get('/:id', auth, async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      let fileFromDB = await FileRepository.findOneBy({ id: Number(id) })

      res.json({ message: fileFromDB })
    } catch (e) {
      res.json({ messsage: "Can't get file." })
    }
  })
  .post('/download/:id', auth, async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      let fileFormDB = await FileRepository.findOneBy({ id: Number(id) })

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
      res.json({ messsage: "Can't read file" })
    }
  })
