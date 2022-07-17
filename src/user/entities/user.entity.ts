import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
