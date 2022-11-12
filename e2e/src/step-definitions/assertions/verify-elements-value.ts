import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { ScenarioWorld } from '../setup/world';
import { waitFor } from '../../support/wait-for-behaviour';

Then(
  /^the "([^"]*)" should contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementText = await page.textContent(elementIdentifier)
      return elementText?.includes((expectedElementText))
    })
  }
)
