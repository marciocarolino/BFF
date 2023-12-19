import { Module } from '@nestjs/common';
import { ConfigurationModules } from './configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigurationModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
