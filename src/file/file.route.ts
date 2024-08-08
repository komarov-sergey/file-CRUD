// @ts-nocheck
import fs from 'node:fs'
import { Router } from 'express'
import R from 'ramda'

import { FileService, FileRepository } from './file.repository'
import auth from '../middleware/auth'
import { getExtension } from '../helpers'

export default Router()
  .post('/upload', auth, async ({ files }, res) => {
    const { originalname: name, mimetype, size, path } = R.head(files)

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
  .get('/list', auth, async ({ query: { page, list_size } }, res) =>
    FileRepository.findAndCount({
      skip: Number(page),
      take: Number(list_size),
    })
      .then(data => res.json(data))
      .catch(e => res.status(422).json({ errors: { body: [e.toString()] } }))
  )
  .delete('/delete/:id', auth, async ({ params: { id } }, res) =>
    FileService.deleteFile(id)
      .then(data => res.json(data))
      .catch(e => res.status(422).json({ errors: { body: [e.toString()] } }))
  )
  .put('/update/:id', auth, async ({ params: { id }, files }, res) =>
    FileService.updateFile(id, files)
      .then(data => res.json(data))
      .catch(e => res.status(422).json({ errors: { body: [e.toString()] } }))
  )
  .get('/:id', auth, async ({ params: { id } }, res) =>
    FileRepository.findOneBy({ id: Number(id) })
      .then(data => res.json(data))
      .catch(e => res.status(422).json({ errors: { body: [e.toString()] } }))
  )
  .post('/download/:id', auth, async ({ params: { id } }, res) => {
    try {
      let fileFormDB = await FileRepository.findOneBy({ id: Number(id) })

      if (!fileFormDB) {
        return res.json({ messsage: 'File not found.' })
      }

      const path = `${fileFormDB.path}`
      const file = fs.createReadStream(path)
      const filename = new Date().toISOString()
      res.setHeader(
        'Content-Disposition',
        'attachment: filename="' + filename + '"'
      )
      return file.pipe(res)
    } catch (e) {
      return res.json({ messsage: "Can't read file" })
    }
  })
