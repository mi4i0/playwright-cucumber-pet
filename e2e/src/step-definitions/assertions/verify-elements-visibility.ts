import { Then } from '@cucumber/cucumber';
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { ScenarioWorld } from '../setup/world';
import { waitFor } from '../../support/wait-for-behavior';

Then(
  /^the "([^"]*)" should( not)? be displayed/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const isElementVisible: boolean = (await page.$(elementIdentifier)) != null;
      return isElementVisible === !negate;
    });
  }
);

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed/,
  async function (this: ScenarioWorld, elementPosition, elementKey: ElementKey, negate: boolean) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`the ${elementPosition} ${elementKey} should ${negate ? 'not ' : ''}be displayed`);

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalConfig);
    const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;


    await waitFor(async () => {
      const isElementVisible: boolean = (await page.$(`${elementIdentifier}>>nth=${elementIndex}`)) != null;
      return isElementVisible === !negate;
    });
  }
);

Then(
  /^I should( not)? see "(\d*)" "([^"]*)" displayed$/,
  async function (this: ScenarioWorld, negate: boolean, count: string, elementKey: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I should ${negate ? 'not ' : ''}see ${count} ${elementKey} displayed`);

    const elementIdentifier: ElementKey = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const element = await page.$$(elementIdentifier);
      return (Number(count) === element.length) === !negate;
    });
  }
);
