import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { MailService } from './mailer.service';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
    private readonly mailService: MailService,
  ) {}

  async registerAttendance(name?: string, phone?: string, attending?: boolean, adults?: number, children?: number) {
    const confirmation = new this.attendanceModel({ name, phone, attending, adults, children });
    await confirmation.save();

    // Disparar email após confirmação
    await this.mailService.sendAttendanceEmail(name, phone, attending, adults, children);

    return { message: 'Resposta registrada e email enviado.' };
  }

  async getAllAttendances(): Promise<Attendance[]> {
    return this.attendanceModel.find().exec();
  }

  async getAttendanceById(id: string): Promise<Attendance | null> {
    return this.attendanceModel.findById(id).exec();
  }

  async updateAttendance(id: string, data: UpdateAttendanceDto): Promise<Attendance | null> {
    return this.attendanceModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteAttendance(id: string): Promise<Attendance | null> {
    return this.attendanceModel.findByIdAndDelete(id).exec();
  }
}