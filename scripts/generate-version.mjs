import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const output = resolve(root, 'src/assets/version.json');
const timeZone = 'America/Sao_Paulo';

function toBrazilianIsoString(date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'longOffset'
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value])
  );
  const offset = parts.timeZoneName.replace('GMT', '') || 'Z';

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

const buildInfo = {
  version: packageJson.version,
  buildId: process.env.GITHUB_SHA ?? 'local',
  builtAt: toBrazilianIsoString(new Date()),
  timeZone
};

await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(buildInfo, null, 2)}\n`, 'utf8');
console.log(`Build ${buildInfo.version} (${buildInfo.buildId.slice(0, 7)})`);
