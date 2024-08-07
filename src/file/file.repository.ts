import R from 'ramda'
import fs from 'node:fs'

import { AppDataSource } from '../data-source'
import { File } from './file.entity'

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
}
