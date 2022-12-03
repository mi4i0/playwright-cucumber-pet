import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from '../setup/world';
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { getIframeElement } from '../../support/html-behaviour';
import { waitFor } from '../../support/wait-for-behaviour';

Then(/^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);
    const elementIframe = await getIframeElement(page, iframeIdentifier);

    await waitFor(async () => {
      const isElementVisible = (await elementIframe?.$(elementIdentifier)) != null;
      return isElementVisible === !negate;
    });
  });

Then(/^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean, expectedElementText: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);
    const elementIframe = await getIframeElement(page, iframeIdentifier);

    await waitFor(async () => {
      const elementText = await elementIframe?.textContent(elementIdentifier);
      return elementText?.includes(expectedElementText) === !negate;
    });
  });

Then(/^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean, expectedElementText: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);
    const elementIframe = await getIframeElement(page, iframeIdentifier);

    await waitFor(async () => {
      const elementText = await elementIframe?.textContent(elementIdentifier);
      return (elementText === expectedElementText) === !negate;
    });
  });