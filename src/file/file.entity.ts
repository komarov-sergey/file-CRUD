import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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
  extension: string

  @Column()
  mimetype: string

  @Column()
  size: string

  @Column()
  path: string
}
