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
        description: 'Indica se o presente já foi reservado por alguém',
        example: true,
        required: false,
    })
    reserved?: boolean;
}
