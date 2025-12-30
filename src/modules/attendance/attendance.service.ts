import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { MailService } from './mailer.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
    private readonly mailService: MailService,
  ) { }

  async registerAttendance(name?: string, email?: string) {
    const confirmation = new this.attendanceModel({ name, email });
    await confirmation.save();

    // Disparar email após confirmação
    await this.mailService.sendConfirmationEmail(name, email);

    return { message: 'Presença confirmada e email enviado.' };
  }
}
