import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdiomaPrincipal } from './entities/idioma_principal.entity';
import { IdiomaPrincipalController } from './idioma_principal.controller';
import { IdiomaPrincipalService } from './idioma_principal.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdiomaPrincipal])],
  controllers: [IdiomaPrincipalController],
  providers: [IdiomaPrincipalService],
})
export class IdiomaPrincipalModule {}
