import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID('4')
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsOptional()
  @IsUUID('4')
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
