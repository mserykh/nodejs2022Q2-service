import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class EditTrackDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  duration: number;
}
