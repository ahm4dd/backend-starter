import { config } from "./config/env.ts";
import { createApp } from "./http/app.ts";
import { pool } from "./infra/db/index.ts";

const app = createApp();
const SHUTDOWN_TIMEOUT_MS = 10_000;
let isShuttingDown = false;

const server = app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});

function closeServer() {
  return new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function shutdown(signal: string) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Shutting down with signal: ${signal}`);

  const forceShutdownTimer = setTimeout(() => {
    console.error(`Forced shutdown after ${SHUTDOWN_TIMEOUT_MS}ms`);
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceShutdownTimer.unref();

  try {
    await closeServer();
    await pool.end();
    clearTimeout(forceShutdownTimer);
    process.exit(0);
  } catch (error) {
    clearTimeout(forceShutdownTimer);
    console.error("Failed graceful shutdown", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
