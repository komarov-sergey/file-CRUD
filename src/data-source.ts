import 'reflect-metadata'
import {DataSource} from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [],
  subscribers: [],
})
