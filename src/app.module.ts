import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftModule } from './modules/gift/gift.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './modules/health/health.controller';

// Importar conexões e os módulos do MongoDB
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb//localhost/attendance_db',
    ),
    GiftModule,
    AttendanceModule,
  ],
  controllers: [HealthController]
})
export class AppModule { }
