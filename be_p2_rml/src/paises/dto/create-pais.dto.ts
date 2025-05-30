import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, MaxLength } from 'class-validator';

export class CreatePaisDto {
  @ApiProperty()
  @Type(() => Number)
  @IsDefined({ message: 'El campo idSerie debe estar definido' })
  @IsInt({ message: 'El campo idSerie debe ser de tipo numérico' })
  readonly idSerie: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo descripcion debe estar definido' })
  @IsInt({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo descripcion no debe ser mayor a 30 caracteres' })
  readonly descripcion: string;
}
