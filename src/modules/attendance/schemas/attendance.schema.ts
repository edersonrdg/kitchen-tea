import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @ApiProperty({ description: 'Nome completo', example: 'Maria Silva' })
  @Prop({ required: false })
  name?: string;

  @ApiProperty({ description: 'Telefone', example: '11987654321' })
  @Prop({ required: false, match: /^[+]?[0-9]{10,15}$/ })
  phone?: string;

  @ApiProperty({ description: 'Vai comparecer?', example: true })
  @Prop({ required: false })
  attending?: boolean;

  @ApiProperty({ description: 'Total de adultos incluindo você', example: 2 })
  @Prop({ required: false })
  adults?: number;

  @ApiProperty({ description: 'Número de crianças acompanhantes', example: 0 })
  @Prop({ required: false })
  children?: number;

  @ApiProperty({ description: 'Data de criação', example: '2024-01-15T14:30:00.000Z' })
  @Prop({ required: false, default: Date.now })
  createdAt?: Date;

  updatedAt?: Date;

  @ApiProperty({ description: 'Informações adicionais', example: { observacoes: '...' } })
  @Prop({ required: false, type: Object })
  additionalInfo?: Record<string, any>;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);