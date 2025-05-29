import { Serie } from 'src/series/entities/serie.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_serie' })
  idSerie: number;

  @Column('varchar', { length: 30 })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Serie, serie => serie.pais)
  @JoinColumn({ name: 'id_serie', referencedColumnName: 'id' })
  series: Serie;
}
