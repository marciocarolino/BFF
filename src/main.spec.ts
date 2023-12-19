import { AppService } from './app.service';

describe('Main', () => {
  it('should bootstrap successfully', async () => {
    const appService = new AppService();
    await expect(appService.bootstrap()).resolves.not.toThrow();
  });
});
