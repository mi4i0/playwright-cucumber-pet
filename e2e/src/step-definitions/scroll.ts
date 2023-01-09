import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behavior';
import { scrollElementIntoView } from '../support/html-behaviour';

Then(
  /^I scroll to the "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I scroll to the ${elementKey}`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementStable = await page.waitForSelector(elementIdentifier);

      if (elementStable) {
        await scrollElementIntoView(page, elementIdentifier);
      }

      return elementStable;
    });
  }
);