import { Test, TestingModule } from '@nestjs/testing';
import { IdiomaPrincipalController } from './idioma_principal.controller';
import { IdiomaPrincipalService } from './idioma_principal.service';

describe('IdiomaPrincipalController', () => {
  let controller: IdiomaPrincipalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdiomaPrincipalController],
      providers: [IdiomaPrincipalService],
    }).compile();

    controller = module.get<IdiomaPrincipalController>(IdiomaPrincipalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
