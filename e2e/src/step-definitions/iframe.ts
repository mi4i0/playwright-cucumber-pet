import { Then } from '@cucumber/cucumber';
import { waitFor, waitForSelector } from '../support/wait-for-behavior';
import { getIframeElement, inputValueOnIframe } from '../support/html-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { logger } from "../logger";

Then(
  /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, inputValue: string) {
    const {
      screen: {page},
      globalConfig
    } = this;

    logger.log(`I fill in the ${elementKey} input on the ${iframeName} iframe with ${inputValue}`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);

    await waitFor(async () => {
      const iframeStable = await waitForSelector(page, iframeIdentifier);

      if (iframeStable) {
        const elementIframe = await getIframeElement(page, iframeIdentifier);

        if (elementIframe) {
          await inputValueOnIframe(elementIframe, elementIdentifier, inputValue);
        }
      }
      return iframeStable;
    });
  }
);
