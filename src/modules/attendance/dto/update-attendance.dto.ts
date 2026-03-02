import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, Matches, IsBoolean, IsInt, Min, ValidateIf } from 'class-validator';

export class UpdateAttendanceDto {
    @ApiProperty({
        description: 'Nome completo da pessoa que confirmará presença',
        example: 'Maria Silva',
    })
    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    name?: string;

    @ApiProperty({
        description: 'Telefone da pessoa que confirmará presença (com DDD, preferencialmente com código do país se internacional)',
        example: '11987654321',
    })
    @IsOptional()
    @IsString({ message: 'Telefone deve ser uma string' })
    @Matches(/^[+]?[0-9]{10,15}$/, { message: 'Telefone inválido: deve conter apenas dígitos (opcional + no início) e ter entre 10 e 15 caracteres' })
    phone?: string;

    @ApiProperty({
        description: 'Indica se a pessoa comparecerá ao evento',
        example: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'Comparecimento deve ser um booleano' })
    attending?: boolean;

    @ApiProperty({
        description: 'Total de adultos incluindo você',
        example: 3,
    })
    @IsOptional()
    @IsInt({ message: 'Número de adultos deve ser um inteiro' })
    @Min(0, { message: 'Número de adultos não pode ser negativo' })
    @ValidateIf(o => o.attending === true)
    @Min(1, { message: 'Se você vai comparecer, o total de adultos deve ser pelo menos 1' })
    adults?: number;

    @ApiProperty({
        description: 'Número de crianças acompanhantes',
        example: 0,
    })
    @IsOptional()
    @IsInt({ message: 'Número de crianças deve ser um inteiro' })
    @Min(0, { message: 'Número de crianças não pode ser negativo' })
    children?: number;

    @ApiProperty({
        description: 'Informações adicionais em formato de objeto genérico',
        example: { observacoes: 'Chegará mais cedo', empresa: 'ACME' },
        required: false,
    })
    @IsOptional()
    @IsObject({})
    additionalInfo?: Record<string, any>;
}