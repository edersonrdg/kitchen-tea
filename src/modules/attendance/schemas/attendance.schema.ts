import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @ApiProperty({
    description: 'Nome completo da pessoa que confirmou presença',
    example: 'Maria Silva',
  })
  @Prop({ required: false })
  name?: string;

  @ApiProperty({
    description: 'Email da pessoa que confirmou presença',
    example: 'maria.silva@email.com',
  })
  @Prop({ required: false })
  email?: string;

  @ApiProperty({
    description: 'Data de criação da confirmação',
    example: '2024-01-15T14:30:00.000Z',
  })
  @Prop({ required: false, default: Date.now })
  createdAt?: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2024-01-15T14:30:00.000Z',
  })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Informações adicionais em formato de objeto genérico',
    example: { telefone: '11999999999', observacoes: 'Chegará mais cedo' },
    required: false,
  })
  @Prop({ required: false, type: Object })
  additionalInfo?: Record<string, any>;
}

// Conversion para MongoDB
export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
