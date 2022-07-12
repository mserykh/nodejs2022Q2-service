import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { DbService } from 'src/db/db.service';
import { UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async getUsers() {
    const users = await this.db.users.findMany();
    users.map((user) => delete user.password);

    return users;
  }

  async getUserById(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is invalid`);

    const user = { ...(await this.db.users.findUnique(id)) };

    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    delete user.password;

    return user;
  }

  async editUser(id: string, dto: UpdatePasswordDto) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is invalid`);
    const user = await this.db.users.findUnique(id);

    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(
        'Provided password is not correct. Cannot update password',
      );

    const updateUser = { ...(await this.db.users.update(id, dto)) };
    delete updateUser.password;

    return updateUser;
  }
}
