import { PartialType } from '@nestjs/swagger';
import { CreateIdiomaPrincipalDto } from './create-idioma_principal.dto';

export class UpdateIdiomaPrincipalDto extends PartialType(CreateIdiomaPrincipalDto) {}
