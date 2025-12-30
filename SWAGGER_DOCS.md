# 📚 Documentação da API - Chá de Cozinha

## Visão Geral

A API do Chá de Cozinha foi desenvolvida para facilitar o gerenciamento de eventos de chá de cozinha, oferecendo funcionalidades essenciais para organizar a lista de presentes e gerenciar confirmações de presença.

## 🔗 Acesso à Documentação Swagger

- **Desenvolvimento**: http://localhost:3000/api/docs
- **Produção**: https://api.chadeckozinha.com.br/api/docs

**Base URL da API**: 
- **Desenvolvimento**: http://localhost:3000/api
- **Produção**: https://api.chadeckozinha.com.br/api

## 🔐 Autenticação

### API Key

Todas as rotas da API (exceto `/health`) exigem autenticação através de uma chave de API que deve ser enviada no header da requisição:

```http
X-API-Key: sua-chave-secreta-aqui
```

**Como configurar:**
1. Defina sua API Key na variável de ambiente `API_KEY`
2. Inclua o header `X-API-Key` em todas as requisições
3. No Swagger UI, clique no botão "Authorize" e insira sua chave

## 📊 Endpoints Detalhados

### 🏥 Health Check

#### `GET /api/health`

**Descrição**: Verifica se a API está funcionando corretamente.

**Autenticação**: ❌ Não requerida

**Resposta**:
```json
"ok"
```

**Códigos de Status**:
- `200`: API funcionando normalmente

---

### 🎁 Presentes

#### `GET /api/gift`

**Descrição**: Retorna a lista completa de presentes disponíveis para o chá de cozinha.

**Autenticação**: ✅ Requerida

**Resposta de Sucesso** (200):
```json
[
  {
    "_id": "65a1234567890abcdef12345",
    "name": "Jogo de panelas",
    "description": "Jogo de panelas antiaderente com 5 peças",
    "reserved": false,
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-15T14:30:00.000Z"
  },
  {
    "_id": "65a1234567890abcdef12346",
    "name": "Liquidificador",
    "description": "Liquidificador 3 velocidades 2L",
    "reserved": true,
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-16T10:15:00.000Z"
  }
]
```

#### `GET /api/gift/:id`

**Descrição**: Retorna os detalhes de um presente específico.

**Parâmetros**:
- `id` (string): ID único do presente

**Resposta de Sucesso** (200):
```json
{
  "_id": "65a1234567890abcdef12345",
  "name": "Jogo de panelas",
  "description": "Jogo de panelas antiaderente com 5 peças",
  "reserved": false,
  "createdAt": "2024-01-15T14:30:00.000Z",
  "updatedAt": "2024-01-15T14:30:00.000Z"
}
```

**Possíveis Erros**:
- `404`: Presente não encontrado

#### `POST /api/gift`

**Descrição**: Adiciona um novo presente à lista.

**Body da Requisição**:
```json
{
  "name": "Jogo de panelas",
  "description": "Jogo de panelas antiaderente com 5 peças",
  "reserved": false
}
```

**Campos**:
- `name` (string, obrigatório): Nome do presente
- `description` (string, obrigatório): Descrição detalhada
- `reserved` (boolean, opcional): Status de reserva (padrão: false)

**Resposta de Sucesso** (201):
```json
{
  "_id": "65a1234567890abcdef12345",
  "name": "Jogo de panelas",
  "description": "Jogo de panelas antiaderente com 5 peças",
  "reserved": false,
  "createdAt": "2024-01-15T14:30:00.000Z",
  "updatedAt": "2024-01-15T14:30:00.000Z"
}
```

#### `PATCH /api/gift/:id`

**Descrição**: Atualiza informações de um presente existente.

**Parâmetros**:
- `id` (string): ID do presente a ser atualizado

**Body da Requisição** (todos os campos são opcionais):
```json
{
  "name": "Jogo de panelas premium",
  "description": "Jogo de panelas antiaderente premium com 7 peças",
  "reserved": true
}
```

**Resposta de Sucesso** (200):
```json
{
  "_id": "65a1234567890abcdef12345",
  "name": "Jogo de panelas premium",
  "description": "Jogo de panelas antiaderente premium com 7 peças",
  "reserved": true,
  "createdAt": "2024-01-15T14:30:00.000Z",
  "updatedAt": "2024-01-16T09:20:00.000Z"
}
```

---

### ✅ Confirmação de Presença

#### `POST /api/attendance`

**Descrição**: Permite que um convidado confirme sua presença no evento. Um email automático será enviado aos organizadores.

**Body da Requisição**:
```json
{
  "name": "Maria Silva",
  "email": "maria.silva@email.com"
}
```

**Campos**:
- `name` (string, obrigatório): Nome completo do convidado
- `email` (string, obrigatório): Email válido do convidado

**Resposta de Sucesso** (201):
```json
{
  "message": "Presença confirmada com sucesso!",
  "data": {
    "_id": "65a1234567890abcdef12347",
    "name": "Maria Silva",
    "email": "maria.silva@email.com",
    "createdAt": "2024-01-15T14:30:00.000Z"
  }
}
```

**Funcionalidades Automáticas**:
- ✉️ Email enviado para os organizadores
- 💾 Dados salvos no banco de dados
- ⏰ Timestamp automático da confirmação

---

## ⚠️ Códigos de Erro Comuns

### 400 - Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "Nome é obrigatório",
    "Email deve ter formato válido"
  ],
  "error": "Bad Request"
}
```

### 401 - Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid API Key",
  "error": "Unauthorized"
}
```

### 404 - Not Found
```json
{
  "statusCode": 404,
  "message": "Presente não encontrado",
  "error": "Not Found"
}
```

### 500 - Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Erro interno do servidor",
  "error": "Internal Server Error"
}
```

---

## 🎯 Casos de Uso Práticos

### 1. Fluxo Completo de Reserva de Presente

1. **Listar presentes**: `GET /api/gift`
2. **Escolher presente**: `GET /api/gift/:id`
3. **Reservar presente**: `PATCH /api/gift/:id` (marcar como `reserved: true`)
4. **Confirmar presença**: `POST /api/attendance`

### 2. Gerenciamento de Lista pelos Organizadores

1. **Adicionar presentes**: `POST /api/gift`
2. **Verificar reservas**: `GET /api/gift`
3. **Atualizar informações**: `PATCH /api/gift/:id`

### 3. Monitoramento da Aplicação

1. **Verificar status**: `GET /api/health`

---

## 📧 Notificações por Email

Quando um convidado confirma presença através do endpoint `POST /api/attendance`, um email é automaticamente enviado para o endereço configurado em `ORGANIZER_EMAIL` com as seguintes informações:

- Nome do convidado
- Email do convidado  
- Data e hora da confirmação
- Link para visualizar todas as confirmações

---

## 🧪 Testando a API

### Usando cURL

```bash
# Health Check
curl -X GET "http://localhost:3000/api/health"

# Listar presentes
curl -X GET "http://localhost:3000/api/gift" \
  -H "X-API-Key: sua-chave-aqui"

# Confirmar presença
curl -X POST "http://localhost:3000/api/attendance" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-chave-aqui" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com"
  }'
```

### Usando a Interface Swagger

1. Acesse: http://localhost:3000/api/docs
2. Clique em "Authorize" e insira sua API Key
3. Expanda os endpoints e clique em "Try it out"
4. Preencha os parâmetros e clique em "Execute"

---

## 📱 Integração Frontend

A API foi projetada para ser facilmente integrada com interfaces web. Exemplos de integração estão disponíveis na documentação do frontend.

### Headers Necessários

```javascript
const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': 'sua-chave-de-api'
};
```

### Exemplo com Fetch API

```javascript
// Confirmar presença
const confirmAttendance = async (name, email) => {
  const response = await fetch('/api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'sua-chave-de-api'
    },
    body: JSON.stringify({ name, email })
  });
  
  return await response.json();
};
```

---

**Documentação atualizada em**: Dezembro 2024  
**Versão da API**: 1.0