import { Pais } from 'src/paises/entities/pais.entity';
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

@Entity('idioma_principal')
export class IdiomaPrincipal {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 30 })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  FechaEliminacion: Date;

  @ManyToOne(() => Pais, pais => pais.idioma_principal)
  @JoinColumn({ name: 'id_pais' })
  pais: Pais;
}
