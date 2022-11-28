import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './report/entities/report.entity';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ReportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [Report],
      synchronize: true,
    }),
    ConfigModule.forRoot({ envFilePath: 'src/config/.env.local' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
