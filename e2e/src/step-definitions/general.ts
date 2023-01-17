import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { logger } from "../logger";

Then(
  /^I wait "([^"]*)" seconds?$/,
  async function (this: ScenarioWorld, waitSeconds: string) {
    const {
      screen: {page},
    } = this;

    logger.log(`I wait ${waitSeconds} seconds`);

    await page.waitForTimeout(parseInt(waitSeconds, 10) * 1000);
  }
);