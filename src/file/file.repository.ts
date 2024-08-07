// @ts-nocheck
import R from 'ramda'
import fs from 'node:fs'

import { AppDataSource } from '../data-source'
import { File } from './file.entity'
import { getExtension } from '../helpers'

export const FileRepository = AppDataSource.getRepository(File)

export class FileService {
  public static async uploadFile(file) {
    return R.tryCatch(
      async () => Promise.resolve(await FileRepository.save({ ...file })),
      e => Promise.reject(e)
    )()
  }

  public static async deleteFile(id) {
    return R.tryCatch(
      async () => {
        let fileFormDB = await FileRepository.findOneBy({ id: Number(id) })
        fs.unlinkSync(`${process.cwd()}/${fileFormDB.path}`)
        await FileRepository.delete({ id: Number(id) })

        return Promise.resolve({ messsage: 'File was deleted.' })
      },
      e => Promise.reject(e)
    )()
  }

  public static async updateFile(id, files) {
    return R.tryCatch(
      async () => {
        const fileFormDB = await FileRepository.findOneBy({ id: Number(id) })

        if (!fileFormDB) {
          return Promise.reject('File not found.')
        }

        let updateFileData

        if (files) {
          const { originalname: name, mimetype, size, path } = R.head(files)

          // del previos file
          let fileFormDB = await FileRepository.findOneBy({ id: Number(id) })
          fs.unlinkSync(`${process.cwd()}/${fileFormDB.path}`)

          updateFileData = {
            name,
            extension: getExtension(name),
            mimetype,
            size,
            path,
          }
        } else {
          const { name, extension, mimetype, size, path } = fileFormDB

          updateFileData = {
            name,
            extension: getExtension(name),
            mimetype,
            size,
            path,
          }
        }

        return FileRepository.update({ id: Number(id) }, updateFileData)
      },
      e => Promise.reject(e)
    )()
  }
}
