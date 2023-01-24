import { Then } from '@cucumber/cucumber';
import { waitFor, waitForResult, waitForSelectorInIframe } from '../../support/wait-for-behavior';
import { ScenarioWorld } from '../setup/world';
import { getElementLocator } from '../../support/web-element-helper';
import { ElementKey } from '../../env/global';
import { getElementWithinIframe, getIframeElement, getTextWithinIframeElement } from '../../support/html-behavior';
import { logger } from "../../logger";

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: string, negate: boolean) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} on the ${iframeKey} iframe should ${negate ? 'not ' : ''}be displayed`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig);

    await waitFor(async () => {
      const elementIframe = await getIframeElement(page, iframeIdentifier);

        if (elementIframe) {
          const isElementVisible = await getElementWithinIframe(elementIframe, elementIdentifier) != null;
          if (isElementVisible === !negate) {
            return {result: waitForResult.PASS};
          } else {
            return {result: waitForResult.FAIL, replace: elementKey};
          }
        } else {
          return {result: waitForResult.ELEMENTS_NOT_AVAILABLE, replace: iframeKey};
        }
      },
      globalConfig,
      {
        target: elementKey,
        failureMessage: `🧨 Expected ${elementKey} to ${negate ? 'not ' : ''}be displayed 🧨`
      });
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: string, negate: boolean, expectedElementText: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} on the ${iframeKey} should ${negate ? 'not ' : ''}contain the text ${expectedElementText}`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig);

    await waitFor(async () => {
      const elementIframe = await getIframeElement(page, iframeIdentifier);

      if (elementIframe) {

        const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier);

        if (elementStable) {
          const elementText = await getTextWithinIframeElement(elementIframe, elementIdentifier);
          if (elementText?.includes(expectedElementText) === !negate) {
            return {result: waitForResult.PASS};
          } else {
            return {result: waitForResult.FAIL, replace: elementKey};
          }
        } else {
          return {result: waitForResult.ELEMENTS_NOT_AVAILABLE, replace: elementKey};
        }
      } else {
        return {result: waitForResult.ELEMENTS_NOT_AVAILABLE, replace: iframeKey};
      }
      },
      globalConfig,
      {
        target: elementKey,
        failureMessage: `🧨 Expected ${elementKey} to ${negate ? 'not ' : ''}contain the text ${expectedElementText} 🧨`
      });
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: string, negate: boolean, expectedElementText: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} on the ${iframeKey} should ${negate ? 'not ' : ''}equal the text ${expectedElementText}`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig);

    await waitFor(async () => {
      const elementIframe = await getIframeElement(page, iframeIdentifier);

      if (elementIframe) {
        const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier);
        if (elementStable) {
          const elementText = await getTextWithinIframeElement(elementIframe, elementIdentifier);
          if ((elementText === expectedElementText) === !negate) {
            return {result: waitForResult.PASS};
          } else {
            return {result: waitForResult.FAIL, replace: elementKey};
          }
        } else {
          return {result: waitForResult.ELEMENTS_NOT_AVAILABLE, replace: elementKey};
        }
      } else {
        return {result: waitForResult.ELEMENTS_NOT_AVAILABLE, replace: iframeKey};
      }
      },
      globalConfig,
      {
        target: elementKey,
        failureMessage: `🧨 Expected ${elementKey} ${negate ? 'not ' : ''}equal the text ${expectedElementText} 🧨`
      });
  }
);