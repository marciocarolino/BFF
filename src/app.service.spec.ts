import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('deve inicializar a aplicação', async () => {
    const originalEnvPort = process.env.PORT;
    process.env.PORT = '3001';
    const createMock = jest.spyOn(NestFactory, 'create');
    const appMock: any = {
      enableCors: jest.fn(),
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
    expect(appMock.enableCors).toHaveBeenCalled();
    expect(createDocumentMock).toHaveBeenCalledWith(
      appMock,
      expect.any(Object),
      expect.any(Object),
    );
    expect(setupMock).toHaveBeenCalledWith('api', appMock, expect.any(Object));
    expect(appMock.listen).toHaveBeenCalledWith(originalEnvPort);
    process.env.PORT = originalEnvPort;
  });

  it('should create SwaggerDocumentOptions with correct operationIdFactory', async () => {
    const createDocumentSpy = jest.spyOn(SwaggerModule, 'createDocument');

    await appService.bootstrap();

    const capturedOptions: SwaggerDocumentOptions =
      createDocumentSpy.mock.calls[0][2];

    const mockControllerKey = 'MockController';
    const mockMethodKey = 'mockMethod';

    const simulatedOperationId = capturedOptions.operationIdFactory(
      mockControllerKey,
      mockMethodKey,
    );

    expect(simulatedOperationId).toEqual(mockMethodKey);
  });
});
