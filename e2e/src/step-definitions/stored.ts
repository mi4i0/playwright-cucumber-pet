import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor, waitForResult, waitForSelector } from '../support/wait-for-behavior';
import { ElementKey } from '../env/global';
import { logger } from "../logger";

Then(
  /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, variableKey: string) {
    const {
      screen: {page},
      globalConfig,
      globalVariables,
    } = this;

    logger.log(`I retrieve the ${elementKey} text and store it as ${variableKey} in global variables`);

    const elementIdentifier: string = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementStable = await waitForSelector(page, elementIdentifier);

        if (elementStable) {
          const elementText = await page.textContent(elementIdentifier);

          if (elementText != null) {
            globalVariables[variableKey] = elementText;
            return waitForResult.PASS;
          }
        }

        return waitForResult.ELEMENT_NOT_AVAILABLE;
      },
      globalConfig,
      {target: elementKey});

  }
);