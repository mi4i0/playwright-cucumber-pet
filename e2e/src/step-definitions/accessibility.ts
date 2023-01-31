import { Then } from '@cucumber/cucumber';
import { getViolations, injectAxe } from 'axe-playwright';
import { ScenarioWorld } from './setup/world';
import { getCurrentPageId } from "../support/navigation-behavior";
import { createHtmlReport } from "axe-html-reporter";
import { env } from "../env/parseEnv";
import { logger } from "../logger";

Then(
  /^I inject axe accessibility engine$/,
  async function (this: ScenarioWorld) {
    const {
      screen: {page},
    } = this;

    logger.log(`I inject axe accessibility engine`);

    await injectAxe(page);
  }
);

Then(
  /^I generate an accessibility analysis report$/,
  async function (this: ScenarioWorld) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const pageId = getCurrentPageId(page, globalConfig);

    logger.log(`I generate a ${pageId} page accessibility analysis report`);

    createHtmlReport({
      results: {violations: await getViolations(page)},
      options: {
        outputDir: `${env('ACCESSIBILITY_REPORT_PATH')}`,
        reportFileName: `${pageId}_${env('HTML_ACCESSIBILITY_FILE')}`,
      }
    });
  }
);