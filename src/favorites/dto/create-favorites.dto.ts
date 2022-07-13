import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavoritesDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  artists: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  albums: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  tracks: string[];
}
