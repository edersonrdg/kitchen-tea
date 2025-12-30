import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Interface do banco Mongo
export type GiftDocument = Gift & Document;

@Schema({ timestamps: true })
export class Gift {
  @ApiProperty({
    description: 'Nome do presente',
    example: 'Jogo de panelas',
  })
  @Prop({ required: false })
  name?: string;

  @ApiProperty({
    description: 'Descrição detalhada do presente',
    example: 'Jogo de panelas antiaderente com 5 peças',
  })
  @Prop({ required: false })
  description?: string;

  @ApiProperty({
    description: 'Indica se o presente já foi reservado por alguém',
    example: false,
    default: false,
  })
  @Prop({ default: false })
  reserved: boolean;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-01-15T14:30:00.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2024-01-15T14:30:00.000Z',
  })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Informações adicionais em formato de objeto genérico',
    example: { cor: 'azul', marca: 'Tramontina', loja: 'Magazine Luiza' },
    required: false,
  })
  @Prop({ required: false, type: Object })
  additionalInfo?: Record<string, any>;
}

// Gerar esquema para salvar no MongoDB
export const GiftSchema = SchemaFactory.createForClass(Gift);
