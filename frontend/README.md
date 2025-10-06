# Bibl-IA Frontend

Interface moderna para leitura bíblica com anotações inteligentes, desenvolvida com React, TypeScript e Auth0.

## 🚀 Funcionalidades

### 🔐 Autenticação Segura
- Login via Auth0 com proteção de rotas
- Persistência automática de usuários no backend
- Tokens JWT para comunicação segura com API

### 📖 Leitura Bíblica Avançada
- Interface inspirada no design dos anexos fornecidos
- Filtros de leitura por testamento, livro, capítulo e versão
- Visualização responsiva de versículos com cards interativos

### ✨ Funcionalidades Interativas
- **📚 Marcar como Lido**: Acompanhe seu progresso de leitura
- **❤️ Favoritos**: Salve versículos importantes para revisão
- **💭 Comentários**: Adicione suas reflexões sobre cada versículo
- **👁️ Observações**: Faça anotações e perguntas para estudo

### 📊 Painel de Progresso
- Estatísticas pessoais de leitura
- Acompanhamento de progresso por capítulo
- Biblioteca pessoal com anotações e favoritos

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── auth/                    # Configuração Auth0
│   ├── Auth0ProviderWithHistory.tsx
│   └── ProtectedRoute.tsx
├── components/              # Componentes reutilizáveis
│   ├── layout/
│   │   └── Header.tsx       # Cabeçalho da aplicação
│   └── ui/
│       ├── VerseCard.tsx    # Card de versículo interativo
│       ├── ReadingFilter.tsx # Filtros de leitura
│       ├── ProgressPanel.tsx # Painel de estatísticas
│       └── AnnotationBlock.tsx # Bloco de anotações
├── hooks/                   # Hooks customizados
│   ├── useAuth.ts          # Gerenciamento de autenticação
│   ├── useBible.ts         # Dados bíblicos
│   └── useVerseInteractions.ts # Interações de versículos
├── pages/                   # Páginas da aplicação
│   ├── LoginPage.tsx       # Página de login
│   └── BibleReaderPage.tsx # Página principal de leitura
├── services/                # Comunicação com API
│   ├── api.ts              # Cliente HTTP base
│   ├── userService.ts      # Serviços de usuário
│   ├── bibleService.ts     # Serviços bíblicos
│   └── verseInteractionService.ts # Serviços de interação
├── types/                   # Tipos TypeScript
│   └── index.ts            # Definições de tipos
└── router/                  # Configuração de rotas
    └── AppRouter.tsx       # Router com rotas protegidas
```

### Tecnologias Utilizadas

#### Core
- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilização utilitária

#### Autenticação & Roteamento
- **@auth0/auth0-react** - Autenticação Auth0
- **react-router-dom** - Roteamento SPA

#### UI & Ícones
- **lucide-react** - Ícones modernos e consistentes
- **Design System** - Cores e componentes baseados nos anexos

#### Comunicação
- **axios** - Cliente HTTP para API
- **Interceptors** - Gerenciamento automático de tokens

## ⚙️ Configuração

### 1. Pré-requisitos
```bash
Node.js 18+
npm ou yarn
```

### 2. Instalação
```bash
cd frontend
npm install
```

### 3. Configuração de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
# Auth0 Configuration
VITE_AUTH0_DOMAIN=seu-dominio.auth0.com
VITE_AUTH0_CLIENT_ID=seu_client_id
VITE_AUTH0_AUDIENCE=https://sua-api-audience.com

# API Configuration
VITE_API_URL=http://localhost:3000
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```

### 5. Build para Produção
```bash
npm run build
```

## 🎨 Design System

### Cores
- **Background**: `slate-900` (fundo principal)
- **Cards**: `slate-800` (cards e containers)
- **Borders**: `slate-700` (bordas)
- **Text Primary**: `white`
- **Text Secondary**: `slate-300`
- **Text Muted**: `slate-400`

### Cores de Ação
- **Lido**: `green-500` (versículos lidos)
- **Favorito**: `red-500` (versículos favoritos)
- **Comentário**: `blue-500` (comentários)
- **Observação**: `purple-500` (observações)

### Componentes

#### VerseCard
- Card interativo para cada versículo
- Botões de ação (ler, favoritar, comentar, observar)
- Formulários inline para anotações
- Estados visuais para diferentes interações

#### ReadingFilter
- Filtros hierárquicos (Testamento → Livro → Capítulo)
- Busca por palavra-chave
- Seleção de versão bíblica
- Interface expansível

#### ProgressPanel
- Estatísticas pessoais do usuário
- Progresso por capítulo
- Acesso rápido à biblioteca pessoal

## 🔗 Integração com Backend

### Rotas Utilizadas
- `POST /users/persist` - Persistir usuário autenticado
- `GET /users/me` - Dados do usuário atual
- `GET /testaments` - Listar testamentos
- `GET /books` - Listar livros
- `GET /chapters/book/:bookId` - Capítulos por livro
- `GET /verses/chapter/:chapterId` - Versículos por capítulo
- `POST /verse-interactions` - Criar interação
- `GET /verse-interactions/user/:userId` - Interações do usuário

### Autenticação
Todas as rotas protegidas requerem header:
```
Authorization: Bearer <JWT_TOKEN>
```

## 🚀 Deploy

### Variáveis de Ambiente de Produção
```bash
VITE_AUTH0_DOMAIN=production-domain.auth0.com
VITE_AUTH0_CLIENT_ID=production_client_id
VITE_AUTH0_AUDIENCE=https://api.production.com
VITE_API_URL=https://api.production.com
```

### Build Otimizado
```bash
npm run build
npm run preview  # Para testar o build localmente
```

## 📱 Responsividade

A interface foi desenvolvida com **mobile-first** e é totalmente responsiva:

- **Mobile** (< 768px): Layout em coluna única
- **Tablet** (768px - 1024px): Layout híbrido
- **Desktop** (> 1024px): Layout completo com sidebar

## 🛠️ Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run lint` - Análise de código
- `npm run preview` - Preview do build

### Convenções de Código
- **Componentes**: PascalCase (ex: `VerseCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useAuth.ts`)
- **Services**: camelCase com sufixo `Service` (ex: `userService.ts`)
- **Types**: PascalCase para interfaces (ex: `User`, `Verse`)

## 🧪 Testing

A aplicação está preparada para testes com:
- **React Testing Library** - Testes de componentes
- **Jest** - Framework de testes
- **MSW** - Mock de APIs para testes

## 📄 Licença

Este projeto foi desenvolvido como parte da implementação do sistema Bibl-IA, focando em uma experiência de leitura bíblica moderna e interativa.

---

**Desenvolvido com ❤️ usando React + TypeScript + Auth0**