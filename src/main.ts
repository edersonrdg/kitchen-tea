import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './shared/guards/api-key.guard';
import { configSwagger } from './shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Definir prefixo global para as APIs ANTES da configuração do Swagger
  app.setGlobalPrefix('api');

  // Configuração do Swagger (após definir o prefixo)
  configSwagger(app);

  // Habilitar validação global utilizando classe validadora
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Aplicar autenticação de API Key globalmente
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  console.log(
    `📚 Documentação Swagger disponível em: http://localhost:${port}/api/docs`,
  );
}

void bootstrap();
