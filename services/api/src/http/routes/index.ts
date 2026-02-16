import type { Express } from "express";
import type { NotesController } from "../controllers/notes.controller.ts";
import { createNotesRouter } from "./notes.route.ts";
import { createSystemRouter } from "./system.route.ts";

type RouteDependencies = {
  noteController: NotesController;
};

export function registerRoutes(
  app: Express,
  dependencies: RouteDependencies,
): void {
  app.use(createSystemRouter());
  app.use("/notes", createNotesRouter(dependencies));
}
