import {AppDataSource} from '../data-source'
import {File} from './file.entity'

export const FileRepository = AppDataSource.getRepository(File)

export class FileController {
  public static async uploadFile(file) {
    try {
      const newFile = await FileRepository.save({...file})
      return Promise.resolve(newFile)
    } catch (e) {
      console.log(e)
      Promise.reject(e)
    }
  }
}
