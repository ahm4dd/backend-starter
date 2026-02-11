import { config } from './config/env.ts';
import { createApp } from './http/app.ts';

const app = createApp();

const server = app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});

function shutdown(signal: string) {
  console.log(`Shutting down with signal: ${signal}`);
  server.close();

  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});
