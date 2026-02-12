import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import {
  CreateNoteBodySchema,
  ErrorBodySchema,
  ErrorResponseSchema,
  HealthResponseSchema,
  NoteIdParamSchema,
  NoteResponseSchema,
  NoteSchema,
} from '@template/contracts';
import { z } from 'zod';

export const OPEN_API_ROUTE = '/openapi.json';
export const DOCS_ROUTE = '/docs';
export const OPEN_API_VERSION = '1.0.0';
export const OPEN_API_TITLE = 'backend-starter API';
export const OPEN_API_DESCRIPTION =
  'Notes API with health checks and machine-readable OpenAPI documentation.';

const registry = new OpenAPIRegistry();

const CreateNoteInputSchema = CreateNoteBodySchema.meta({ id: 'CreateNoteInput' });
const NoteOpenApiSchema = NoteSchema.meta({ id: 'Note' });
const NoteResponseOpenApiSchema = NoteResponseSchema.meta({ id: 'NoteResponse' });
const HealthResponseOpenApiSchema = HealthResponseSchema.meta({ id: 'HealthResponse' });
const ErrorBodyOpenApiSchema = ErrorBodySchema.meta({ id: 'ErrorBody' });
const ErrorResponseOpenApiSchema = ErrorResponseSchema.meta({ id: 'ErrorResponse' });

const NoteIdPathParameterSchema = z.toJSONSchema(NoteIdParamSchema, {
  target: 'openApi3',
}) as Record<string, unknown>;

function createJsonResponse(description: string, schema: z.ZodType) {
  return {
    description,
    content: {
      'application/json': {
        schema,
      },
    },
  };
}

registry.registerPath({
  method: 'get',
  path: '/health',
  tags: ['system'],
  operationId: 'getHealth',
  summary: 'Health check',
  description: 'Returns API liveness status.',
  responses: {
    '200': createJsonResponse('Service is healthy.', HealthResponseOpenApiSchema),
    '500': createJsonResponse('Unexpected server error.', ErrorResponseOpenApiSchema),
  },
});

registry.registerPath({
  method: 'post',
  path: '/notes',
  tags: ['notes'],
  operationId: 'createNote',
  summary: 'Create note',
  description: 'Creates a new note.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: CreateNoteInputSchema,
          examples: {
            createNote: {
              value: {
                title: 'Quarterly planning',
                description: 'Draft the Q4 plan',
              },
            },
          },
        },
      },
    },
  },
  responses: {
    '201': createJsonResponse('Note created.', NoteResponseOpenApiSchema),
    '400': createJsonResponse('Invalid request payload.', ErrorResponseOpenApiSchema),
    '500': createJsonResponse('Unexpected server error.', ErrorResponseOpenApiSchema),
  },
});

registry.registerPath({
  method: 'get',
  path: '/notes/{id}',
  tags: ['notes'],
  operationId: 'getNoteById',
  summary: 'Get note by id',
  description: 'Returns the note for the provided id.',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Note UUID',
      required: true,
      schema: NoteIdPathParameterSchema,
    },
  ],
  responses: {
    '200': createJsonResponse('Note found.', NoteResponseOpenApiSchema),
    '400': createJsonResponse('Invalid id format.', ErrorResponseOpenApiSchema),
    '404': createJsonResponse('Note not found.', ErrorResponseOpenApiSchema),
    '500': createJsonResponse('Unexpected server error.', ErrorResponseOpenApiSchema),
  },
});

const openApiDefinitions = [
  CreateNoteInputSchema,
  NoteOpenApiSchema,
  NoteResponseOpenApiSchema,
  HealthResponseOpenApiSchema,
  ErrorBodyOpenApiSchema,
  ErrorResponseOpenApiSchema,
  ...registry.definitions,
];

const openApiGenerator = new OpenApiGeneratorV31(openApiDefinitions);

function createOpenApiDocument(serverUrl?: string) {
  return openApiGenerator.generateDocument({
    openapi: '3.1.0' as const,
    info: {
      title: OPEN_API_TITLE,
      version: OPEN_API_VERSION,
      description: OPEN_API_DESCRIPTION,
    },
    ...(serverUrl ? { servers: [{ url: serverUrl }] } : {}),
    tags: [
      {
        name: 'system',
        description: 'System and health operations',
      },
      {
        name: 'notes',
        description: 'Notes CRUD operations',
      },
    ],
  });
}

export const openApiDocument = createOpenApiDocument();

export function buildOpenApiDocument(serverUrl?: string) {
  return createOpenApiDocument(serverUrl);
}
