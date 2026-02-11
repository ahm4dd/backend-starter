import { apiReference } from '@scalar/express-api-reference';
import { Router } from 'express';
import { buildOpenApiDocument, DOCS_ROUTE, OPEN_API_ROUTE, OPEN_API_TITLE } from '../openapi.ts';

export function createSystemRouter(): Router {
  const router = Router();

  router.get(OPEN_API_ROUTE, (req, res) => {
    const host = req.get('host') ?? 'localhost:3000';
    const serverUrl = `${req.protocol}://${host}`;
    res.status(200).json(buildOpenApiDocument(serverUrl));
  });

  router.get(
    DOCS_ROUTE,
    apiReference({
      pageTitle: `${OPEN_API_TITLE} Docs`,
      title: OPEN_API_TITLE,
      url: OPEN_API_ROUTE,
      theme: 'saturn',
      showSidebar: true,
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
    }),
  );

  router.get('/health', (_req, res) => {
    res.status(200).json({ data: { status: 'ok' } });
  });

  return router;
}
