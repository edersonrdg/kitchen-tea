import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';

export class CreateAttendanceDto {
    @ApiProperty({
        description: 'Nome completo da pessoa que confirmará presença',
        example: 'Maria Silva',
    })
    @IsString({ message: 'Nome deve ser uma string' })
    name?: string;

    @ApiProperty({
        description: 'Email da pessoa que confirmará presença',
        example: 'maria.silva@email.com',
    })
    @IsEmail({}, { message: 'Email deve ter formato válido' })
    email?: string;


    @ApiProperty({
        description: 'Informações adicionais em formato de objeto genérico',
        example: { telefone: '11999999999', observacoes: 'Chegará mais cedo' },
        required: false,
    })
    @IsObject({})
    additionalInfo?: Record<string, any>;
}
