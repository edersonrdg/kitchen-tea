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
        description: 'URL do produto (link para compra)',
        example: 'https://www.magazineluiza.com.br/jogo-de-panelas/p/123456',
    })
    @IsOptional()
    @IsString({ message: 'productUrl deve ser uma string' })
    productUrl?: string;

    @ApiProperty({
        description: 'URL da foto/imagem do produto',
        example: 'https://static.magazineluiza.com.br/imagem-jogo-panelas.jpg',
    })
    @IsOptional()
    @IsString({ message: 'imageUrl deve ser uma string' })
    imageUrl?: string;

    @ApiProperty({
        description: 'Indica se o presente já foi reservado por alguém',
        example: false,
        default: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Reserved deve ser um valor booleano' })
    reserved?: boolean;

    @ApiProperty({
        description: 'Nome da pessoa que reservou o presente',
        example: 'Maria Silva',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'reservedByName deve ser uma string' })
    reservedByName?: string;

    @ApiProperty({
        description: 'Número de telefone da pessoa que reservou o presente',
        example: '(31) 98765-4321',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'reservedByPhone deve ser uma string' })
    reservedByPhone?: string;

    @IsOptional()
    @ApiProperty({
        description: 'Informações adicionais em formato de objeto genérico',
        example: { cor: 'azul', marca: 'Tramontina', loja: 'Magazine Luiza' },
        required: false,
    })
    additionalInfo?: Record<string, any>;
}