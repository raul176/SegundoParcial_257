import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Pais } from 'src/paises/entities/pais.entity';

export class CreateSerieDto {
  @ApiProperty()
  @Type(() => Number)
  @IsDefined({ message: 'El campo idPais debe estar definido' })
  @IsInt({ message: 'El campo idPais debe ser de tipo numérico' })
  readonly idPais: Pais['id'];

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo titulo es obligatorio' })
  @IsString({ message: 'El campo titulo debe ser de tipo cadena' })
  @MaxLength(250, { message: 'El campo titulo no debe ser mayor a 250 caracteres' })
  readonly titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sinopsis es obligatorio' })
  @IsString({ message: 'El campo sinopsis debe ser de tipo cadena' })
  @MaxLength(5000, { message: 'El campo sinopsis no debe ser mayor a 5000 caracteres' })
  readonly sinopsis: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo director es obligatorio' })
  @IsString({ message: 'El campo director debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo director no debe ser mayor a 100 caracteres' })
  readonly director: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo temporadas es obligatorio' })
  readonly temporadas: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fechaEstreno es obligatorio' })
  readonly fechaEstreno: Date;
}
