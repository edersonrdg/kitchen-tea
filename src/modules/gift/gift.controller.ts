import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@ApiTags('gifts')
@ApiSecurity('api-key')
@Controller('gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) { }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os presentes',
    description:
      'Retorna a lista completa de presentes disponíveis para o chá de cozinha. ' +
      'Esta lista inclui presentes já reservados e disponíveis, permitindo aos convidados ' +
      'visualizar todas as opções e identificar quais ainda estão disponíveis para reserva.',
  })
  async findAll() {
    return this.giftService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de um presente específico',
    description:
      'Retorna os detalhes completos de um presente específico baseado no seu ID. ' +
      'Útil para visualizar informações detalhadas antes de fazer uma reserva.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do presente no banco de dados',
    example: '65a1234567890abcdef12345',
    type: 'string',
  })
  async findOne(@Param('id') id: string) {
    return this.giftService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar novo presente à lista',
    description:
      'Permite adicionar um novo presente à lista do chá de cozinha. ' +
      'Este endpoint é tipicamente usado pelos organizadores para gerenciar a lista de presentes disponíveis.',
  })
  async create(@Body() data: CreateGiftDto) {
    return this.giftService.create(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar informações de um presente',
    description:
      'Permite atualizar as informações de um presente existente, incluindo nome, descrição ' +
      'ou status de reserva. Muito útil para marcar presentes como reservados ou atualizar detalhes.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do presente a ser atualizado',
    example: '65a1234567890abcdef12345',
    type: 'string',
  })
  async updateGift(@Param('id') id: string, @Body() updates: UpdateGiftDto) {
    return this.giftService.update(id, updates);
  }
}
