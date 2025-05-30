import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdiomaPrincipalModule } from './idioma_principal/idioma_principal.module';
import { PaisesModule } from './paises/paises.module';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities/*.{ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SeriesModule,
    PaisesModule,
    IdiomaPrincipalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
