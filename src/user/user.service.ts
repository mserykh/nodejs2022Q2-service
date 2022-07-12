import {
  BadRequestException,
  ForbiddenException,
  ImATeapotException,
  Injectable,
  InternalServerErrorException,
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

    const result = { ...users };
    result.map((user) => delete user.password);

    return result;
  }

  async getUserById(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is invalid`);

    const user = await this.db.users.findUnique(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    const result = { ...user };
    delete result.password;
    return result;
  }

  async editUser(id: string, dto: UpdatePasswordDto) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is invalid`);

    const user = await this.db.users.findUnique(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(
        'Provided password is not correct. Cannot update password',
      );

    const updateUser = await this.db.users.update(id, dto);
    const result = { ...updateUser };
    delete result.password;

    return result;
  }

  async deleteUser(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is invalid`);

    const user = await this.db.users.findUnique(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    const isDeleted = await this.db.users.delete(id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }
}
