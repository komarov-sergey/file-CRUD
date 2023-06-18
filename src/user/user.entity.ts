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

  @Column({unique: true})
  email: string

  @Column({unique: true})
  phone: string

  @Column({
    length: 1500,
  })
  password: string

  @Column({
    nullable: true,
  })
  refreshToken: string
}
