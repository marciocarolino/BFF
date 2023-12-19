import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should bootstrap the application', async () => {
    jest
      .spyOn(appService, 'bootstrap')
      .mockImplementationOnce(async () => undefined);

    await appService.bootstrap();

    expect(appService.bootstrap).toHaveBeenCalled();
  });
});
