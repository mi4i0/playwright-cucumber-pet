import { Then } from '@cucumber/cucumber';
import { waitFor, waitForSelectorOnPage } from '../../support/wait-for-behavior';
import { ScenarioWorld } from '../setup/world';
import { getElementLocator } from '../../support/web-element-helper';
import { getElementOnPage, getElementTextWithinPage, getTitleWithinPage } from "../../support/html-behavior";
import { ElementKey } from '../../env/global';
import { logger } from "../../logger";

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
  async function (this: ScenarioWorld, elementPosition: string, negate: boolean, expectedTitle: string) {
    const {
      globalConfig,
      screen: {page, context},
    } = this;

    logger.log(`the ${elementPosition} window|tab should ${negate ? 'not ' : ''}contain the title ${expectedTitle}`);

    const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

    await page.waitForTimeout(2000);

    await waitFor(async () => {
      const pages = context.pages();
      const pageTitle = await getTitleWithinPage(page, pages, pageIndex);
      return pageTitle?.includes(expectedTitle) === !negate;
    },
      globalConfig,
      {target: 'title'});
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean) {
    const {
      screen: {page, context},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} on the ${elementPosition} window|tab should ${negate ? 'not ' : ''}be displayed`);

    const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
        const pages = context.pages();
        const isElementVisible = await getElementOnPage(page, elementIdentifier, pages, pageIndex) != null;
        return isElementVisible === !negate;
      },
      globalConfig,
      {target: elementKey});
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean, expectedElementText: string) {
    const {
      screen: {page, context},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} on the ${elementPosition} window|tab should ${negate ? 'not ' : ''}contain the text ${expectedElementText}`);

    const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
        const pages = context.pages();
        const elementStable = await waitForSelectorOnPage(page, elementIdentifier, pages, pageIndex);
        if (elementStable) {
          const elementText = await getElementTextWithinPage(page, elementIdentifier, pages, pageIndex);
          return elementText?.includes(expectedElementText) === !negate;
        } else {
          return elementStable;
        }
      },
      globalConfig,
      {target: elementKey});
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean, expectedElementText: string) {
    const {
      screen: {page, context},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} on the ${elementPosition} window|tab should ${negate ? 'not ' : ''}equal the text ${expectedElementText}`);

    const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;
    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
        const pages = context.pages();
        const elementStable = await waitForSelectorOnPage(page, elementIdentifier, pages, pageIndex);
        if (elementStable) {
          const elementText = await pages[pageIndex].textContent(elementIdentifier);
          return (elementText === expectedElementText) === !negate;
        } else {
          return elementStable;
        }
      },
      globalConfig,
      {target: elementKey});
  }
);
