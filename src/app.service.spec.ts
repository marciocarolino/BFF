import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

describe('AppService', () => {
  let appService: AppService;

  beforeAll(() => {
    process.env.PORT = '3001';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('deve inicializar a aplicação', async () => {
    const createMock = jest.spyOn(NestFactory, 'create');
    const appMock: any = {
      enableCors: jest.fn(), // Simulando o método enableCors
      listen: jest.fn(),
      getHttpAdapter: jest.fn(),
    };
    createMock.mockResolvedValue(appMock);

    const createDocumentMock = jest.spyOn(SwaggerModule, 'createDocument');
    createDocumentMock.mockReturnValue({} as any);

    const setupMock = jest.spyOn(SwaggerModule, 'setup');
    setupMock.mockImplementation((route, app) => {
      if (app && app.get) {
        app.get('');
      }
    });

    await appService.bootstrap();

    expect(createMock).toHaveBeenCalledWith(AppModule);
    expect(appMock.enableCors).toHaveBeenCalled(); // Verifique se o enableCors foi chamado
    expect(createDocumentMock).toHaveBeenCalledWith(
      appMock,
      expect.any(Object),
      expect.any(Object),
    );
    expect(setupMock).toHaveBeenCalledWith('api', appMock, expect.any(Object));
    expect(appMock.listen).toHaveBeenCalledWith(process.env.PORT || 3001);
  });
});
