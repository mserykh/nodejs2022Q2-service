import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassowrd: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
