import { ConflictException, Injectable } from '@nestjs/common';
import { CreateIdiomaPrincipalDto } from './dto/create-idioma_principal.dto';
import { UpdateIdiomaPrincipalDto } from './dto/update-idioma_principal.dto';
import { IdiomaPrincipal } from './entities/idioma_principal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IdiomaPrincipalService {
  constructor(
    @InjectRepository(IdiomaPrincipal)
    private idiomaPrincipalRepository: Repository<IdiomaPrincipal>,
  ) {}

  async create(createIdiomaPrincipalDto: CreateIdiomaPrincipalDto): Promise<IdiomaPrincipal> {
    const existe = await this.idiomaPrincipalRepository.findOneBy({
      descripcion: createIdiomaPrincipalDto.descripcion.trim(),
      //idPais: createIdiomaPrincipalDto.idPais,
    });

    if (existe) throw new ConflictException('El idiomaPrincipal ya existe');

    const idiomaPrincipal = new IdiomaPrincipal();
    idiomaPrincipal.descripcion = createIdiomaPrincipalDto.descripcion.trim();
    return this.idiomaPrincipalRepository.save(idiomaPrincipal);
  }
  async findAll() {
    return this.idiomaPrincipalRepository.find({ order: { descripcion: 'ASC' } });
  }
  async findOne(
    id: number,
    updateIdiomaPrincipalDto: UpdateIdiomaPrincipalDto,
  ): Promise<IdiomaPrincipal> {
    const idiomaPrincipal = await this.idiomaPrincipalRepository.findOneBy({ id });
    if (!idiomaPrincipal) throw new NotFoundException('El idiomaprincipal no existe');
    return idiomaPrincipal;
  }

  async update(
    id: number,
    updateIdiomaPrincipalDto: UpdateIdiomaPrincipalDto,
  ): Promise<IdiomaPrincipal> {
    const idiomaPrincipal = await this.findOne(id);
    Object.assign(idiomaPrincipal, updateIdiomaPrincipalDto);
    return this.idiomaPrincipalRepository.save(idiomaPrincipal);
  }
  async remove(id: number) {
    const IdiomaPrincipal = await this.findOne(id);
    return this.idiomaPrincipalRepository.softRemove(IdiomaPrincipal);
  }
}
