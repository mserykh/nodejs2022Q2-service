import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async getUsers() {
    const users = this.db.users.findMany();
    users.map((user) => delete user.password);

    return users;
  }
  async getUserById(id: string) {
    const user = await this.db.users.findUnique(id);

    delete user.password;

    return user;
  }
}
