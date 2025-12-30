import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateGiftDto {
    @ApiProperty({
        description: 'Nome do presente',
        example: 'Jogo de panelas',
    })
    @IsString({ message: 'Nome deve ser uma string' })
    name?: string;

    @ApiProperty({
        description: 'Descrição detalhada do presente',
        example: 'Jogo de panelas antiaderente com 5 peças',
    })
    @IsString({ message: 'Descrição deve ser uma string' })
    description?: string;

    @ApiProperty({
        description: 'Indica se o presente já foi reservado por alguém',
        example: false,
        default: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Reserved deve ser um valor booleano' })
    reserved?: boolean;

    @IsOptional()
    @ApiProperty({
        description: 'Informações adicionais em formato de objeto genérico',
        example: { cor: 'azul', marca: 'Tramontina', loja: 'Magazine Luiza' },
        required: false,
    })
    additionalInfo?: Record<string, any>;
}
