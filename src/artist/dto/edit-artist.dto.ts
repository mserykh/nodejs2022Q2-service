import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  grammy: boolean;
}
