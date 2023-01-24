import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { scrollElementIntoView, } from '../support/html-behavior';
import { waitFor, waitForResult, waitForSelector } from '../support/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';
import { logger } from "../logger";

Then(
  /^I scroll to the "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I scroll to the ${elementKey}`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
        const elementStable = await waitForSelector(page, elementIdentifier);

        if (elementStable) {
          await scrollElementIntoView(page, elementIdentifier);
          return waitForResult.PASS;
        }

        return waitForResult.ELEMENTS_NOT_AVAILABLE;
      },
      globalConfig,
      {target: elementKey});
  }
);
