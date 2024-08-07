import { AppDataSource } from '../data-source'
import { File } from './file.entity'
import R from 'ramda'

export const FileRepository = AppDataSource.getRepository(File)

export class FileService {
  public static async uploadFile(file) {
    return R.tryCatch(
      async () => Promise.resolve(await FileRepository.save({ ...file })),
      e => Promise.reject(e)
    )()
  }
}
