import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behavior';
import { getIframeElement, inputValueOnIframe } from '../support/html-behaviour';

Then(/^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, inputValue: string) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);

    await waitFor(async () => {
      const elementIframe  = await getIframeElement(page, iframeIdentifier);

      const result = await page.waitForSelector(iframeIdentifier, {
        state: 'visible',
      });

      if (result) {
        if (elementIframe) {
          await inputValueOnIframe(elementIframe, elementIdentifier, inputValue);
        }
      }

      return result;
    });
  });