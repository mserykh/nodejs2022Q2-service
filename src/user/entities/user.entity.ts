import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: false })
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value) => value.getTime(),
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value) => value.getTime(),
    },
  })
  updatedAt: Date;
}

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
