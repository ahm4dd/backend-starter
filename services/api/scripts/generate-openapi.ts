import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApiDocument } from '../src/http/openapi.ts';

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = dirname(scriptPath);
const outputPath = resolve(scriptDir, '../openapi/openapi.json');

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(openApiDocument, null, 2)}\n`, 'utf8');

console.log(`OpenAPI document generated at ${outputPath}`);
