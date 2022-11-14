import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { inputValue, selectValue } from '../support/html-behaviour';
import { waitFor } from '../support/wait-for-behaviour';

Then(/^I fill in the "([^"]*)" input with "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, input: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I fill in the ${elementKey} input with ${input}`);

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const result = await page.waitForSelector(elementIdentifier, {
        state: 'visible'
      });

      if (result){
        await inputValue(page,elementIdentifier, input);
      }

      return result;
    });

  });

Then(/^I select the "([^"]*)" option from the "([^"]*)"$/,
  async function (this: ScenarioWorld, option: string, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I select the ${option} input with ${elementKey}`);

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const result = await page.waitForSelector(elementIdentifier, {
        state: 'visible'
      });

      if (result){
        await selectValue(page,elementIdentifier, option);
      }

      return result;
    });

  });