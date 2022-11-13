import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behaviour';
import { clickElement } from '../support/html-behaviour';

When(/^I click the "([^"]*)" (?:link|button|icon|element)$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I click the ${elementKey}`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const result = await page.waitForSelector(elementIdentifier, {
        state: 'visible',
      });

      if (result) {
        await clickElement(page, elementIdentifier);
      }

      return result;
    });
  });