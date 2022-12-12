import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behavior';
import { checkElement, uncheckElement } from '../support/html-behaviour';

Then(/^I (check)?(uncheck)? the "([^"]*)" (?:radio button|check box|switch)$/,
  async function (this: ScenarioWorld, isChecked: boolean, isUnchecked: boolean, elementKey: ElementKey) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier: string = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const result = await page.waitForSelector(elementIdentifier, {
        state: "visible"
      });
      if (result) {
        if (isUnchecked) {
          await uncheckElement(page, elementIdentifier);
        } else {
          await checkElement(page, elementIdentifier);
        }
      }
      return result;
    });
  }
);