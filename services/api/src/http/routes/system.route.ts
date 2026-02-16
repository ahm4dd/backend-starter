import { apiReference } from "@scalar/express-api-reference";
import { ServiceUnavailableError } from "@template/shared";
import { Router } from "express";
import { checkDatabaseHealth } from "../../infra/db/index.ts";
import {
  DOCS_ROUTE,
  OPEN_API_ROUTE,
  OPEN_API_TITLE,
  openApiDocument,
} from "../openapi.ts";

export function createSystemRouter(): Router {
  const router = Router();

  router.get(OPEN_API_ROUTE, (_req, res) => {
    res.status(200).json(openApiDocument);
  });

  router.get(
    DOCS_ROUTE,
    apiReference({
      pageTitle: `${OPEN_API_TITLE} Docs`,
      title: OPEN_API_TITLE,
      url: OPEN_API_ROUTE,
      theme: "saturn",
      showSidebar: true,
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );

  router.get("/health", async (_req, res) => {
    const isDatabaseHealthy = await checkDatabaseHealth();
    if (!isDatabaseHealthy) {
      throw new ServiceUnavailableError("Database is unavailable");
    }

    res.status(200).json({ data: { status: "ok" } });
  });

  return router;
}
