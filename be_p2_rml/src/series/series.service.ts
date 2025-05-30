import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { Serie } from './entities/serie.entity';

@Injectable()
export class SeriesService {
  constructor(@InjectRepository(Serie) private seriesRepository: Repository<Serie>) {}

  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    const existe = await this.seriesRepository.findOneBy({
      titulo: createSerieDto.titulo.trim(),
      // idPais: createSerieDto.idPais,
    });

    if (existe) throw new ConflictException('La serie ya existe');

    const serie = new Serie();
    // serie.idPais = createSerieDto.idPais;
    serie.titulo = createSerieDto.titulo.trim();
    serie.sinopsis = createSerieDto.sinopsis.trim();
    serie.director = createSerieDto.director.trim();
    serie.temporadas = createSerieDto.temporadas;
    serie.fechaEstreno = createSerieDto.fechaEstreno;
    return this.seriesRepository.save(serie);
  }

  async findAll() {
    return this.seriesRepository.find({ order: { titulo: 'ASC' } });
  }

  async findOne(id: number): Promise<Serie> {
    const serie = await this.seriesRepository.findOneBy({ id });
    if (!serie) throw new NotFoundException('El serie no existe');
    return serie;
  }
  async update(id: number, updateSerieDto: UpdateSerieDto): Promise<Serie> {
    const serie = await this.findOne(id);
    Object.assign(serie, updateSerieDto);
    return this.seriesRepository.save(serie);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    return this.seriesRepository.softRemove(serie);
  }
}
