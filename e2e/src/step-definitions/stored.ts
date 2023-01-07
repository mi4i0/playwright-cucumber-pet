import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behavior';

Then(
  /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, variableKey: string) {
    const {
      screen: {page},
      globalConfig,
      globalVariables,
    } = this;

    const elementIdentifier: string = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const result = await page.waitForSelector(elementIdentifier, {state: 'visible'});

      if (result) {
        const elementText = await page.textContent(elementIdentifier);
        if (elementText != null) {
          globalVariables[variableKey] = elementText;
        }
      }

      return result;
    });
  });