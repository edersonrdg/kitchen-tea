import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@ApiTags('attendance')
@ApiSecurity('api-key')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({
    summary: 'Confirmar presença no chá de cozinha',
    description:
      'Permite que um convidado confirme sua presença no evento do chá de cozinha. ' +
      'Ao confirmar, um email automático será enviado para os organizadores com os dados da confirmação. ' +
      'Os dados da confirmação também são armazenados no banco de dados para controle.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Presença confirmada com sucesso. Email enviado para os organizadores.',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Presença confirmada com sucesso!',
        },
        data: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '65a1234567890abcdef12345',
            },
            name: {
              type: 'string',
              example: 'Maria Silva',
            },
            phone: {
              type: 'string',
              example: '11987654321',
            },
            attending: {
              type: 'boolean',
              example: true,
            },
            adults: {
              type: 'number',
              example: 1,
            },
            children: {
              type: 'number',
              example: 0,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T14:30:00.000Z',
            },
          },
        },
      },
    },
  })
  async confirmPresence(@Body() data: CreateAttendanceDto) {
    return this.attendanceService.registerAttendance(data.name, data.phone, data.attending, data.adults, data.children);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter todas as confirmações de presença',
    description: 'Retorna uma lista de todas as confirmações de presença registradas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de confirmações de presença retornada com sucesso.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65a1234567890abcdef12345' },
          name: { type: 'string', example: 'Maria Silva' },
          phone: { type: 'string', example: '11987654321' },
          attending: { type: 'boolean', example: true },
          adults: { type: 'number', example: 1 },
          children: { type: 'number', example: 0 },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' },
        },
      },
    },
  })
  async getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter uma confirmação de presença específica',
    description: 'Retorna os detalhes de uma confirmação de presença pelo ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Confirmação de presença retornada com sucesso.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '65a1234567890abcdef12345' },
        name: { type: 'string', example: 'Maria Silva' },
        phone: { type: 'string', example: '11987654321' },
        attending: { type: 'boolean', example: true },
        adults: { type: 'number', example: 1 },
        children: { type: 'number', example: 0 },
        createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Confirmação de presença não encontrada.',
  })
  async getAttendanceById(@Param('id') id: string) {
    const attendance = await this.attendanceService.getAttendanceById(id);
    if (!attendance) {
      throw new NotFoundException(`Confirmação de presença com ID ${id} não encontrada.`);
    }
    return attendance;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma confirmação de presença',
    description: 'Atualiza os detalhes de uma confirmação de presença pelo ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Confirmação de presença atualizada com sucesso.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '65a1234567890abcdef12345' },
        name: { type: 'string', example: 'Maria Silva' },
        phone: { type: 'string', example: '11987654321' },
        attending: { type: 'boolean', example: true },
        adults: { type: 'number', example: 1 },
        children: { type: 'number', example: 0 },
        createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Confirmação de presença não encontrada.',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos.',
  })
  async updateAttendance(@Param('id') id: string, @Body() data: UpdateAttendanceDto) {
    const updated = await this.attendanceService.updateAttendance(id, data);
    if (!updated) {
      throw new NotFoundException(`Confirmação de presença com ID ${id} não encontrada.`);
    }
    return updated;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma confirmação de presença',
    description: 'Remove uma confirmação de presença pelo ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Confirmação de presença deletada com sucesso.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Confirmação de presença deletada com sucesso.' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Confirmação de presença não encontrada.',
  })
  async deleteAttendance(@Param('id') id: string) {
    const deleted = await this.attendanceService.deleteAttendance(id);
    if (!deleted) {
      throw new NotFoundException(`Confirmação de presença com ID ${id} não encontrada.`);
    }
    return { message: 'Confirmação de presença deletada com sucesso.' };
  }
}