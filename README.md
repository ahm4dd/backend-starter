# backend-starter

TypeScript monorepo starter focused on backend APIs with:

- Express 5 HTTP service
- Zod validation and reusable transport contracts
- Drizzle ORM + PostgreSQL
- OpenAPI 3.1 generation from code
- Scalar API reference UI

## Architecture

This repository uses a simple layered backend design:

- `services/api/src/http`:
  HTTP transport (routes, controllers, middleware, OpenAPI docs exposure)
- `services/api/src/app`:
  application services and orchestration logic
- `services/api/src/domain`:
  domain models and repository interfaces
- `services/api/src/infra`:
  infrastructure implementations (database and repository adapters)
- `packages/shared/src`:
  shared cross-service primitives (application errors)
- `packages/contracts/src`:
  shared transport contracts (HTTP payloads and API schemas)

## Project Structure

```text
.
├── packages/
│   ├── contracts/
│   │   └── src/
│   └── shared/
│       └── src/
├── services/
│   └── api/
│       ├── src/
│       ├── drizzle/
│       ├── openapi/
│       └── scripts/
├── package.json
└── turbo.json
```

## Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL (or any reachable Postgres-compatible instance)

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment:

```bash
cp services/api/.env.example services/api/.env
```

3. Start development:

```bash
pnpm dev
```

API defaults to `http://localhost:3000`.

## Environment Variables

`services/api/.env`:

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | no | `development` | Runtime environment (`development`, `production`, `test`) |
| `PORT` | no | `3000` | HTTP listening port |
| `DATABASE_URL` | yes | - | PostgreSQL connection string |

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/health` | Service liveness probe |
| `POST` | `/notes` | Create a note |
| `GET` | `/notes/:id` | Fetch note by UUID |
| `GET` | `/openapi.json` | OpenAPI 3.1 document |
| `GET` | `/docs` | Scalar interactive API reference |

### Example: Create Note

```bash
curl -X POST http://localhost:3000/notes \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Quarterly planning",
    "description": "Draft the Q4 plan"
  }'
```

### Error Format

All API errors return a standardized payload:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "requestId": "uuid-or-null",
    "path": "/notes",
    "method": "POST",
    "docsUrl": "/docs",
    "details": {}
  }
}
```

## Scripts

### Workspace scripts (`package.json`)

| Script | Description |
|---|---|
| `pnpm dev` | Run workspace dev tasks in parallel via Turbo |
| `pnpm lint` | Lint all packages |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm typecheck` | Type-check all packages |
| `pnpm db:generate:api` | Generate Drizzle migration for API service |
| `pnpm db:migrate:api` | Apply Drizzle migrations for API service |
| `pnpm openapi:generate:api` | Generate static OpenAPI JSON for API service |

### API service scripts (`services/api/package.json`)

| Script | Description |
|---|---|
| `pnpm --filter @template/api dev` | Start API with file watching |
| `pnpm --filter @template/api lint` | Lint API service |
| `pnpm --filter @template/api typecheck` | Type-check API service |
| `pnpm --filter @template/api db:generate` | Generate migration files |
| `pnpm --filter @template/api db:migrate` | Run migrations |
| `pnpm --filter @template/api openapi:generate` | Write `services/api/openapi/openapi.json` |

## OpenAPI + Scalar Workflow

OpenAPI is generated from code using:

- Zod schemas as source of truth for request/response contracts
- `@asteasolutions/zod-to-openapi` registry and generator
- Scalar Express middleware for docs rendering

Contract schema location:

- `packages/contracts/src/http`

Primary implementation files:

- `services/api/src/http/openapi.ts`
- `services/api/src/http/routes/system.route.ts`
- `services/api/scripts/generate-openapi.ts`

Generate static docs artifact:

```bash
pnpm openapi:generate:api
```

Generated output:

- `services/api/openapi/openapi.json`

## Database

- Drizzle schema: `services/api/src/infra/db/schema.ts`
- Drizzle config: `services/api/drizzle.config.ts`
- SQL migrations: `services/api/drizzle/*.sql`

## Notes On Testing

There is currently no test runner configured in `services/api/package.json`.
The architecture supports dependency injection (`createApp` and repository interfaces),
which makes it straightforward to add unit/integration tests.

## License

MIT
