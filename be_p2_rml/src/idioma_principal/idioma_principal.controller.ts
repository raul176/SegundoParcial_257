import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateIdiomaPrincipalDto } from './dto/create-idioma_principal.dto';
import { UpdateIdiomaPrincipalDto } from './dto/update-idioma_principal.dto';
import { IdiomaPrincipalService } from './idioma_principal.service';

@Controller('idioma_principal')
export class IdiomaPrincipalController {
  constructor(private readonly idiomaPrincipalService: IdiomaPrincipalService) {}

  @Post()
  create(@Body() createIdiomaPrincipalDto: CreateIdiomaPrincipalDto) {
    return this.idiomaPrincipalService.create(createIdiomaPrincipalDto);
  }

  @Get()
  findAll() {
    return this.idiomaPrincipalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idiomaPrincipalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdiomaPrincipalDto: UpdateIdiomaPrincipalDto) {
    return this.idiomaPrincipalService.update(+id, updateIdiomaPrincipalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idiomaPrincipalService.remove(+id);
  }
}
