import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behavior';
import { inputValueOnPage } from '../support/html-behaviour';

Then(/^I fill in the "([^"]*)" input on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) with "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, inputValue: string) {
    const {
      screen: {page, context},
      globalConfig,
    } = this;

    console.log(`I fill in the ${elementKey} input on the ${elementPosition} window|tab with ${inputValue}`);

    const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;
    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor((async () => {
      const pages = context.pages();
      const result = await pages[pageIndex].waitForSelector(elementIdentifier, {
        state: 'visible'
      });

      if (result) {
        await inputValueOnPage(pages, pageIndex, elementIdentifier, inputValue);
      }

      return result;
    }));
  });
