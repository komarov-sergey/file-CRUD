import 'reflect-metadata'
import {DataSource} from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'root',
  password: 'Password',
  database: 'mysql',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [],
  subscribers: [],
})
