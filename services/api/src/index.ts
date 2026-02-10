import { config } from './config/env.ts';
import { createApp } from './http/app.ts';

const app = createApp();

const server = app.listen(config.PORT, () => {
  console.log(`Example app listening on port http://localhost:${config.PORT}`);
});

function shutdown(signal: string) {
  console.log(`Shutting down with signal: ${signal}`);
  new Promise((resolve) => server.close(resolve));

  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGINT');
});
