import { Module } from '@nestjs/common';
import { ConfigurationModules } from './configuration/configuration.module';

@Module({
  imports: [ConfigurationModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
