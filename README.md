# 🍫 ChocoLand

Landing page de chocolates artesanais com sistema de newsletter integrado via mensageria.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-5-000?logo=express)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-4-FF6600?logo=rabbitmq)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3-85EA2D?logo=swagger)
![Vitest](https://img.shields.io/badge/Vitest-21_tests-6E9F18?logo=vitest)
![CI](https://github.com/victor-delfino/Chocoland/actions/workflows/ci.yml/badge.svg)

## Visão Geral

| Camada         | Tecnologia           | Descrição                                             |
| -------------- | -------------------- | ----------------------------------------------------- |
| **Frontend**   | React + Tailwind     | Landing page responsiva com 7 seções                  |
| **Backend**    | Express + TypeScript | API REST que publica mensagens no RabbitMQ            |
| **Mensageria** | RabbitMQ             | Broker de mensagens (fila `newsletter_subscriptions`) |
| **Worker**     | Node.js              | Consumidor que processa inscrições e salva no SQLite  |
| **Banco**      | SQLite               | Persistência local dos inscritos                      |
| **Docs**       | Swagger UI           | Documentação interativa da API (`/api-docs`)          |
| **Testes**     | Vitest + Supertest   | testes (unitários + integração)                       |
| **CI/CD**      | GitHub Actions       | Pipeline automático a cada push/PR                    |
| **Infra**      | Docker Compose       | Orquestra o RabbitMQ localmente                       |

## Arquitetura

```
┌─────────────┐  POST   ┌──────────────┐ publish ┌──────────────┐ consume ┌──────────────┐
│   React     │────────▶│   Express    │────────▶│   RabbitMQ   │────────▶│   Worker     │───────▶│   SQLite     │
│  (frontend) │         │   (API)      │         │   (broker)   │         │ (consumidor) │        │   (banco)    │
│  :5173      │         │  :3001       │         │  :5672       │         │              │        │ chocoland.db │
└─────────────┘         └──────────────┘         └──────────────┘         └──────────────┘        └──────────────┘
                                  │ /api-docs  │         Painel: :15672
```

## Estrutura do Projeto

```
Chocoland/
├── docker-compose.yml
├── react/                          # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx          # Navegação com Logo SVG
│   │   │   ├── Logo.tsx            # Logo em SVG inline
│   │   │   └── FeatureCard.tsx     # Card reutilizável (props)
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Seção principal
│   │   │   ├── Showcase.tsx        # Carrossel de chocolates (useState)
│   │   │   ├── Features.tsx        # Grid de benefícios (map + key)
│   │   │   ├── CallToAction.tsx    # CTA com link para newsletter
│   │   │   ├── Newsletter.tsx      # Inscrição integrada ao backend
│   │   │   └── Footer.tsx          # Rodapé
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
└── backend/                        # API + Worker
    ├── src/
    │   ├── server.ts               # Express — POST /api/subscribe
    │   ├── worker.ts               # Consumidor da fila RabbitMQ
    │   ├── rabbitmq.ts             # Módulo de conexão (reutilizável)
    │   ├── database.ts             # SQLite — persistência dos inscritos
    │   └── swagger.ts              # Spec OpenAPI 3.0
    ├── tests/
    │   ├── database.test.ts        # Testes unitários do banco
    │   ├── server.test.ts          # Testes de integração da API
    │   └── worker.test.ts          # Testes do processamento de mensagens
    ├── package.json
    └── tsconfig.json
```

## Como Rodar

### Pré-requisitos

- Node.js 18+
- Docker Desktop

### 1. RabbitMQ

```bash
docker compose up -d
```

Painel de gerenciamento: http://localhost:15672 (login: `chocoland` / `chocoland123`)

### 2. Backend

```bash
cd backend
npm install
npm run dev       # API em http://localhost:3001
```

### 3. Worker (em outro terminal)

```bash
cd backend
npm run worker    # Consome mensagens da fila
```

### 4. Frontend

```bash
cd react
npm install
npm run dev       # App em http://localhost:5173
```

## Endpoints da API

| Método | Rota               | Descrição                                      |
| ------ | ------------------ | ---------------------------------------------- |
| `GET`  | `/api/health`      | Health check + status do RabbitMQ              |
| `POST` | `/api/subscribe`   | Inscreve email na newsletter (publica na fila) |
| `GET`  | `/api/subscribers` | Lista todos os inscritos do banco              |

Documentação interativa: **http://localhost:3001/api-docs**

**Exemplo:**

```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@email.com", "name": "Hugo"}'
```

## Testes

```bash
cd backend
npm test            # roda todos os testes (21)
npm run test:watch  # modo watch (re-executa ao salvar)
```

| Suíte              | Testes | Tipo       | O que cobre                                              |
| ------------------ | ------ | ---------- | -------------------------------------------------------- |
| `database.test.ts` | 8      | Unitário   | Insert, duplicata, listagem, ordenação, contagem         |
| `server.test.ts`   | 8      | Integração | Endpoints HTTP (health, subscribe, subscribers, swagger) |
| `worker.test.ts`   | 5      | Unitário   | Parse de mensagem, persistência, validações, edge cases  |

## CI/CD

GitHub Actions roda a cada push/PR na `main`:

| Job                | O que faz                                                    |
| ------------------ | ------------------------------------------------------------ |
| **Backend Tests**  | Levanta RabbitMQ via services, instala deps, roda `npm test` |
| **Frontend Build** | Instala deps e roda `npm run build` (valida compilação)      |

## Conceitos Aplicados

### React

- Componentes funcionais e componentização
- Props com interfaces TypeScript
- `useState` (formulários, carrossel, renderização condicional)
- Listas com `.map()` e `key`
- Controlled inputs e eventos
- Fetch API para integração com backend

### Backend

- Producer/Consumer pattern com RabbitMQ
- Filas duráveis e mensagens persistentes
- Worker com `prefetch(1)` e `ack`
- SQLite com WAL mode para persistência
- Swagger UI (OpenAPI 3.0) para documentação
- CORS para comunicação cross-origin

### Tailwind CSS

- `@layer components` com `@apply` para classes reutilizáveis
- Flexbox e CSS Grid responsivo
- Mobile-first com prefixos (`md:`, `lg:`)
- Pseudo-elements (`after:`) para animações
- Arbitrary values e keyframes customizados

## Licença

MIT
