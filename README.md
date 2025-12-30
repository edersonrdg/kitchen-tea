# 🎉 Chá de Cozinha API

Uma API completa para gerenciamento de chá de cozinha, permitindo aos convidados visualizar presentes disponíveis e confirmar presença no evento.

## 📋 Características

- 🎁 **Lista de Presentes**: Gerenciamento completo da lista de presentes do chá de cozinha
- ✅ **Confirmação de Presença**: Sistema para confirmação de presença dos convidados
- 📧 **Notificação por Email**: Envio automático de emails para os organizadores a cada confirmação
- 🔐 **Autenticação API Key**: Segurança através de chave de API
- 📚 **Documentação Swagger**: Documentação interativa completa da API
- ✨ **Validação de Dados**: Validação robusta de entrada de dados

## 🚀 Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de APIs escaláveis
- **MongoDB**: Banco de dados NoSQL com Mongoose
- **Swagger/OpenAPI**: Documentação automática da API
- **Nodemailer**: Envio de emails
- **Class Validator**: Validação de dados de entrada
- **TypeScript**: Tipagem estática para JavaScript

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd attendance
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   # Configuração do MongoDB
   MONGODB_URI=mongodb://localhost:27017/cha-de-cozinha
   
   # Configuração da API Key
   API_KEY=sua-chave-secreta-aqui
   
   # Configuração do Email (Nodemailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASS=sua-senha-do-app
   EMAIL_FROM=seu-email@gmail.com
   
   # Email dos organizadores (onde chegam as notificações)
   ORGANIZER_EMAIL=organizador@email.com
   
   # Porta da aplicação
   PORT=3000
   ```

4. **Inicie a aplicação**
   ```bash
   # Desenvolvimento
   npm run start:dev
   
   # Produção
   npm run build
   npm run start:prod
   ```

## 📚 Documentação da API

A documentação interativa está disponível através do Swagger UI:

- **Local**: http://localhost:3000/api/docs
- **Produção**: https://api.chadeckozinha.com.br/api/docs

### Autenticação

Todas as rotas (exceto `/health`) requerem autenticação via API Key no header:
```
X-API-Key: sua-chave-secreta-aqui
```

## 🔗 Endpoints Principais

### Health Check
- **GET** `/api/health` - Verificar status da API

### Presentes
- **GET** `/api/gift` - Listar todos os presentes
- **GET** `/api/gift/:id` - Obter detalhes de um presente
- **POST** `/api/gift` - Adicionar novo presente
- **PATCH** `/api/gift/:id` - Atualizar presente

### Confirmação de Presença
- **POST** `/api/attendance` - Confirmar presença

## 📝 Exemplos de Uso

### 1. Listar todos os presentes
```bash
curl -X GET "http://localhost:3000/api/gift" \
  -H "X-API-Key: sua-chave-secreta-aqui"
```

### 2. Confirmar presença
```bash
curl -X POST "http://localhost:3000/api/attendance" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-chave-secreta-aqui" \
  -d '{
    "name": "Maria Silva",
    "email": "maria.silva@email.com"
  }'
```

### 3. Adicionar novo presente
```bash
curl -X POST "http://localhost:3000/api/gift" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-chave-secreta-aqui" \
  -d '{
    "name": "Jogo de panelas",
    "description": "Jogo de panelas antiaderente com 5 peças",
    "reserved": false
  }'
```

### 4. Reservar um presente
```bash
curl -X PATCH "http://localhost:3000/api/gift/65a1234567890abcdef12345" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-chave-secreta-aqui" \
  -d '{
    "reserved": true
  }'
```

## 🏗️ Estrutura do Projeto

```
src/
├── main.ts                 # Ponto de entrada da aplicação
├── app.module.ts           # Módulo principal
├── modules/
│   ├── attendance/         # Módulo de confirmação de presença
│   │   ├── attendance.controller.ts
│   │   ├── attendance.service.ts
│   │   ├── attendance.module.ts
│   │   ├── mailer.service.ts
│   │   ├── dto/
│   │   │   └── create-attendance.dto.ts
│   │   └── schemas/
│   │       └── attendance.schema.ts
│   ├── gift/              # Módulo de presentes
│   │   ├── gift.controller.ts
│   │   ├── gift.service.ts
│   │   ├── gift.module.ts
│   │   ├── dto/
│   │   │   ├── create-gift.dto.ts
│   │   │   └── update-gift.dto.ts
│   │   └── schemas/
│   │       └── gift.schema.ts
│   └── health/            # Health check
│       └── health.controller.ts
└── shared/
    ├── guards/
    │   └── api-key.guard.ts
    └── dto/
        └── api-response.dto.ts
```

## 🧪 Scripts Disponíveis

```bash
npm run build          # Compilar o projeto
npm run format         # Formatar código
npm run start          # Iniciar aplicação
npm run start:dev      # Iniciar em modo desenvolvimento
npm run start:debug    # Iniciar em modo debug
npm run start:prod     # Iniciar em modo produção
npm run lint           # Verificar e corrigir problemas de código
npm run test           # Executar testes
npm run test:watch     # Executar testes em modo watch
npm run test:cov       # Executar testes com cobertura
npm run test:e2e       # Executar testes end-to-end
```

## 📧 Configuração de Email

Para que as notificações por email funcionem, configure as variáveis no arquivo `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-do-app-google
EMAIL_FROM=seu-email@gmail.com
ORGANIZER_EMAIL=organizador@email.com
```

**Para Gmail:**
1. Ative a verificação em 2 etapas
2. Gere uma senha de app
3. Use a senha de app no `EMAIL_PASS`

## 🔒 Segurança

- Todas as rotas são protegidas por API Key
- Validação rigorosa de dados de entrada
- Headers de segurança configurados
- Sanitização de dados

## 📊 Monitoramento

- Endpoint `/api/health` para verificação de status
- Logs detalhados de requisições
- Validação de entrada com feedback detalhado

## 🐳 Deploy

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e destinado ao uso específico do chá de cozinha.

## 📞 Suporte

Para suporte, entre em contato através do email: organizador@email.com

---

**Feito com ❤️ para o chá de cozinha**