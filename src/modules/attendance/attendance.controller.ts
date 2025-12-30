import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@ApiTags('attendance')
@ApiSecurity('api-key')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

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
            email: {
              type: 'string',
              example: 'maria.silva@email.com',
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
    return this.attendanceService.registerAttendance(data.name, data.email);
  }
}
