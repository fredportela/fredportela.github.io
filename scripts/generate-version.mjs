import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const output = resolve(root, 'src/assets/version.json');

const buildInfo = {
  version: packageJson.version,
  buildId: process.env.GITHUB_SHA ?? 'local',
  builtAt: new Date().toISOString()
};

await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(buildInfo, null, 2)}\n`, 'utf8');
console.log(`Build ${buildInfo.version} (${buildInfo.buildId.slice(0, 7)})`);
