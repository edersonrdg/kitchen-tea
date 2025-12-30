import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({
        summary: 'Verificar saúde da API',
        description:
            'Endpoint simples para verificar se a API está funcionando corretamente. ' +
            'Retorna uma resposta básica indicando que o serviço está operacional. ' +
            'Útil para monitoramento e verificações de disponibilidade.',
    })
    @ApiResponse({
        status: 200,
        description: 'API está funcionando corretamente',
        schema: {
            type: 'string',
            example: 'ok',
        },
    })
    check() {
        return 'ok';
    }
}
