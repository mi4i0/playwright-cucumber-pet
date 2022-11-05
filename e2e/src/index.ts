import dotenv from 'dotenv'
import { env, getJsonFromFile } from './env/parseEnv'
import { GlobalConfig, HostConfig, PagesConfig } from '../env/global';

dotenv.config({path: env('COMMON_CONFIG_FILE')});

const hostsConfig: HostConfig = getJsonFromFile(env('HOST_URLS_PATH'));
console.log("hostsConfig", hostsConfig);
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGES_URLS_PATH'));
console.log('pagesConfig', pagesConfig);

const worldParameters: GlobalConfig = {
  hostsConfig,
  pagesConfig,
}
const common = `./src/features/**/*.feature \
--require-module ts-node/register \
--require ./src/step-definitions/**/**/*.ts \
--world-parameters ${JSON.stringify(worldParameters)}
-f json:./reports/report.json \
--format progress-bar`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression }