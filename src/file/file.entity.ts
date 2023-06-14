import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

// import {User} from '../user/user.entity'

// название, расширение, MIME type, размер, дата загрузки;

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updateddAt: string

  @Column()
  name: string

  @Column()
  extension: string // cut from name

  @Column()
  mimetype: string

  @Column()
  size: string

  @Column()
  path: string
}
