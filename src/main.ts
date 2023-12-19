import { AppService } from './app.service';

async function bootstrap() {
  const appService = new AppService();
  await appService.bootstrap();
}
bootstrap();
