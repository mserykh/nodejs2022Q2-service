import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class EditTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsUUID('4')
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
