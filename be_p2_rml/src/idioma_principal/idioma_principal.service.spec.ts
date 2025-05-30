import { Test, TestingModule } from '@nestjs/testing';
import { IdiomaPrincipalService } from './idioma_principal.service';

describe('IdiomaPrincipalService', () => {
  let service: IdiomaPrincipalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdiomaPrincipalService],
    }).compile();

    service = module.get<IdiomaPrincipalService>(IdiomaPrincipalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
