import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const configSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Chá de Cozinha API')
        .setDescription(
            'API para gerenciamento de chá de cozinha com lista de presentes e confirmação de presença. ' +
            'Esta aplicação permite aos convidados visualizar a lista de presentes disponíveis, ' +
            'reservar presentes e confirmar sua presença no evento. ' +
            'A cada confirmação de presença, um email automático é enviado para os organizadores.',
        )
        .setVersion('1.0')
        .setContact('Organizador do Chá de Cozinha', '', 'organizador@email.com')
        .addTag('health', 'Endpoints para verificação de saúde da API')
        .addTag('gifts', 'Gerenciamento da lista de presentes do chá de cozinha')
        .addTag('attendance', 'Confirmação de presença no evento')
        .addApiKey(
            {
                type: 'apiKey',
                name: 'X-API-Key',
                in: 'header',
                description: 'Chave de API necessária para autenticação',
            },
            'api-key',
        )
        .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Servidor de Desenvolvimento')
        .addServer('https://kitchen-tea-api.onrender.com', 'Servidor de Produção')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
        customSiteTitle: 'Chá de Cozinha API - Documentação',
        customfavIcon: 'https://nestjs.com/img/logo-small.svg',
        customCss: '.swagger-ui .topbar { display: none }',
    });
}

