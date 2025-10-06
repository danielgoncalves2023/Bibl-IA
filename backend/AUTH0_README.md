# Autenticação Auth0 - Bibl-IA

Este projeto implementa autenticação Auth0 para proteger as rotas da API.

## Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as seguintes variáveis:

```bash
# Auth0 Configuration
AUTH0_DOMAIN=seu-dominio.auth0.com
AUTH0_AUDIENCE=https://sua-api-audience.com
AUTH0_CLIENT_ID=seu_client_id
AUTH0_CLIENT_SECRET=seu_client_secret
```

### 2. Auth0 Setup

1. Crie uma aplicação no Auth0 Dashboard
2. Configure o tipo como "Single Page Application" ou "Regular Web Application"
3. Defina a API Audience no Auth0
4. Configure as URLs de callback conforme necessário

## Rotas Implementadas

### Rotas de Usuário (Protegidas)

- `POST /users/persist` - Persiste os dados do usuário autenticado
- `GET /users/me` - Retorna os dados do usuário autenticado

### Exemplo de Uso

```typescript
// Headers necessários para rotas protegidas
{
  "Authorization": "Bearer SEU_JWT_TOKEN_AQUI"
}
```

### Resposta da rota `/users/persist`:

```json
{
  "message": "Usuário persistido com sucesso",
  "user": {
    "id": "1",
    "auth0Id": "auth0|123456789",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "createdAt": "2023-10-05T10:00:00.000Z",
    "updatedAt": "2023-10-05T10:00:00.000Z"
  }
}
```

## Proteção de Rotas

### Rotas Protegidas (Padrão)

Por padrão, todas as rotas são protegidas e requerem autenticação JWT válida.

### Rotas Públicas

Para tornar uma rota pública, use o decorator `@Public()`:

```typescript
import { Public } from '../auth/public.decorator';

@Controller('books')
export class BooksController {
  
  @Public()
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // Esta rota requer autenticação
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
}
```

## Estrutura de Arquivos

```
src/
├── auth/
│   ├── auth.module.ts          # Módulo de autenticação
│   ├── jwt.strategy.ts         # Estratégia JWT para Auth0
│   ├── jwt-auth.guard.ts       # Guard de autenticação
│   └── public.decorator.ts     # Decorator para rotas públicas
├── config/
│   └── auth0.config.ts         # Configurações do Auth0
└── users/
    ├── user.controller.ts      # Controller com rotas de usuário
    ├── user.service.ts         # Service para operações de usuário
    └── entity/
        └── user.entity.ts      # Entidade do usuário
```

## Como Funciona

1. **Token JWT**: O frontend envia o token JWT obtido do Auth0 no header `Authorization`
2. **Validação**: A estratégia JWT valida o token usando as chaves públicas do Auth0
3. **Persistência**: A rota `/users/persist` cria ou atualiza o usuário no banco de dados
4. **Proteção**: O guard `JwtAuthGuard` protege todas as rotas por padrão
5. **Rotas Públicas**: Use `@Public()` para rotas que não precisam de autenticação

## Exemplo de Integração Frontend

```javascript
// Exemplo usando fetch
const token = 'seu_jwt_token_do_auth0';

// Persistir usuário
fetch('/users/persist', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));

// Obter dados do usuário
fetch('/users/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(user => console.log(user));
```

## Tratamento de Erros

### Erros Comuns

- `401 Unauthorized`: Token inválido, expirado ou ausente
- `403 Forbidden`: Token válido mas sem permissões necessárias

### Exemplo de Resposta de Erro

```json
{
  "statusCode": 401,
  "message": "Token inválido ou expirado",
  "error": "Unauthorized"
}
```