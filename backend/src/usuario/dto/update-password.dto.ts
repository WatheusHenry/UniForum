import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly password: string;

}
