import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGiftDto } from './create-gift.dto';

export class UpdateGiftDto extends PartialType(CreateGiftDto) {
    @ApiProperty({
        description: 'Nome do presente',
        example: 'Jogo de panelas',
        required: false,
    })
    name?: string;

    @ApiProperty({
        description: 'Descrição detalhada do presente',
        example: 'Jogo de panelas antiaderente com 5 peças',
        required: false,
    })
    description?: string;

    @ApiProperty({
        description: 'URL do produto (link para compra)',
        example: 'https://www.magazineluiza.com.br/jogo-de-panelas/p/123456',
        required: false,
    })
    productUrl?: string;

    @ApiProperty({
        description: 'URL da foto/imagem do produto',
        example: 'https://static.magazineluiza.com.br/imagem-jogo-panelas.jpg',
        required: false,
    })
    imageUrl?: string;

    @ApiProperty({
        description: 'Indica se o presente já foi reservado por alguém',
        example: true,
        required: false,
    })
    reserved?: boolean;

    @ApiProperty({
        description: 'Nome da pessoa que reservou o presente',
        example: 'Maria Silva',
        required: false,
    })
    reservedByName?: string;

    @ApiProperty({
        description: 'Número de telefone da pessoa que reservou o presente',
        example: '(31) 98765-4321',
        required: false,
    })
    reservedByPhone?: string;
}