import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class EditAlbumDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
