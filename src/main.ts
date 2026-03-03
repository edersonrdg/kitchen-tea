import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './shared/guards/api-key.guard';
import { configSwagger } from './shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS ANTES de qualquer outra configuração (guards, prefix, etc.)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://yandg.onrender.com' 
            // Para evitar problemas de IPv6 no Windows/Node
      // Adicione seu domínio de produção aqui depois: 'https://seu-site.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  // Inclui OPTIONS para preflight
    allowedHeaders: 'Content-Type, x-api-key, Authorization, Accept',  // Seu header custom!
    credentials: false,  // Mude para true se usar cookies/sessões no futuro
    preflightContinue: false,
    optionsSuccessStatus: 204,  // Resposta padrão para OPTIONS
  });

  // Definir prefixo global para as APIs
  app.setGlobalPrefix('api');

  // Configuração do Swagger (depois do prefixo)
  configSwagger(app);

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Guard global de API Key (depois do CORS, para não interferir no OPTIONS)
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  console.log(
    `📚 Documentação Swagger disponível em: http://localhost:${port}/docs`,
  );
}

void bootstrap();