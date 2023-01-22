import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { checkElement, uncheckElement, } from "../support/html-behavior";
import { waitFor, waitForSelector } from '../support/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';
import { logger } from "../logger";

Then(
  /^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/,
  async function (this: ScenarioWorld, isChecked: boolean, isUnchecked: boolean, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I ${isUnchecked ? 'uncheck ' : 'check'} the ${elementKey} check box|radio button`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementStable = await waitForSelector(page, elementIdentifier);

      if (elementStable) {
        if (isUnchecked) {
          await uncheckElement(page, elementIdentifier);
        } else {
          await checkElement(page, elementIdentifier);
        }
      }

      return elementStable;
    });
  }
);