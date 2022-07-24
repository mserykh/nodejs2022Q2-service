import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class EditArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
