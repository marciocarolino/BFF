import { Module } from '@nestjs/common';
import { ConfigurationModules } from './configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigurationModules,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
