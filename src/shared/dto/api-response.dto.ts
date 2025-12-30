import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponse {
    @ApiProperty({
        description: 'Código de status HTTP',
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Mensagem(ns) de erro',
        oneOf: [
            { type: 'string', example: 'Erro interno do servidor' },
            {
                type: 'array',
                items: { type: 'string' },
                example: ['Nome é obrigatório', 'Email deve ter formato válido'],
            },
        ],
    })
    message: string | string[];

    @ApiProperty({
        description: 'Tipo do erro',
        example: 'Bad Request',
    })
    error: string;
}

export class ApiSuccessResponse<T = any> {
    @ApiProperty({
        description: 'Mensagem de sucesso',
        example: 'Operação realizada com sucesso',
    })
    message?: string;

    @ApiProperty({
        description: 'Dados retornados pela operação',
    })
    data?: T;
}
