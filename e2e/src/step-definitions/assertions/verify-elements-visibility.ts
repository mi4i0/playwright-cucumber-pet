import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { ScenarioWorld } from '../setup/worlds';
import { waitFor } from '../../support/wait-for-behaviour';

Then(
  /^the "([^"]*)" should be displayed/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: {page},
      globalVariables,
      globalConfig,
    } = this;

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalVariables, globalConfig);

    await waitFor( async () => {
      return (await page.$(elementIdentifier)) != null
    })
  }
)
