import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Pais } from "src/paises/entities/pais.entity";

export class CreateIdiomaPrincipalDto {
  idPais: any;
  descripcion: any;
}
@ApiProperty()
@Type(()=> Number)
@IsDefined({message: 'El campo idPais debe estar definido' })
@IsInt({ message: 'El campo idPais debe ser de tipo numérico' })
readonly idPais: Pais['id'];

@ApiProperty()
@IsNotEmpty({ message: 'El campo titulo es obligatorio' })
@IsString({ message: 'El campo titulo debe ser de tipo cadena' })
@MaxLength(250, { message: 'El campo titulo no debe ser mayor a 250 caracteres' })
readonly descripcion: string; 
}