import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updateddAt: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column({
    length: 1500,
  })
  password: string

  @Column()
  refreshToken: string
}
