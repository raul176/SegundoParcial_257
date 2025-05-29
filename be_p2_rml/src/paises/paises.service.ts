import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { Pais } from './entities/pais.entity';

@Injectable()
export class PaisesService {
  constructor(@InjectRepository(Pais) private paisRepository: Repository<Pais>) {}

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const existe = await this.paisRepository.findOneBy({
      descripcion: createPaisDto.descripcion.trim(),
      idSerie: createPaisDto.idSerie,
    });

    if (existe) throw new ConflictException('El pais ya existe');

    const pais = new Pais();
    pais.idSerie = createPaisDto.idSerie;
    pais.descripcion = createPaisDto.descripcion.trim();
    return this.paisRepository.save(pais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find({
      relations: { series: true },
      select: {
        id: true,
        descripcion: true,
        series: { id: true, titulo: true },
      },
    });
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisRepository.findOne({
      where: { id },
      relations: { series: true },
    });

    if (!pais) throw new NotFoundException('El pais no existe');

    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
    const pais = await this.findOne(id);
    Object.assign(pais, updatePaisDto);
    return this.paisRepository.save(pais);
  }

  async remove(id: number) {
    const pais = await this.findOne(id);
    return this.paisRepository.softRemove(pais);
  }
}
