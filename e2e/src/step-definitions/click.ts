import { When } from '@cucumber/cucumber';
import { clickElement, clickElementAtIndex, } from '../support/html-behavior';
import { ScenarioWorld } from './setup/world';
import { waitFor, waitForSelector } from '../support/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';
import { logger } from "../logger";

When(
  /^I click the "([^"]*)" (?:button|link)$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I click the ${elementKey} (?:button|link|icon|element|radio button)`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementStable = await waitForSelector(page, elementIdentifier);
      if (elementStable) {
        await clickElement(page, elementIdentifier);
      }
      return elementStable;
    });
  }
);

When(
  /^I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link)$/,
  async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I click ${elementPosition} ${elementKey} button|link`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

    await waitFor(async () => {
      const elementStable = await waitForSelector(page, elementIdentifier);

      if (elementStable) {
        await clickElementAtIndex(page, elementIdentifier, pageIndex);
      }

      return elementStable;
    });
  }
);
