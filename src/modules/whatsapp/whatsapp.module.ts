import { Module, forwardRef } from '@nestjs/common';
import { AttendanceModule } from '../attendance/attendance.module';
import { WhatsappService } from './whatsapp.service';

@Module({
    imports: [forwardRef(() => AttendanceModule)],
    providers: [WhatsappService],
    exports: [WhatsappService],
})
export class WhatsappModule { }
