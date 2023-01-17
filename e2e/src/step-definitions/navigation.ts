import { Given } from '@cucumber/cucumber';
import { currentPathMatchesPageId, navigateToPage, reloadPage, } from '../support/navigation-behavior';
import { ScenarioWorld } from './setup/world';
import { waitFor } from '../support/wait-for-behavior';
import { PageId } from '../env/global';
import { logger } from "../logger";

Given(
  /^I am on the "([^"]*)" page$/,
  async function (this: ScenarioWorld, pageId: PageId) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I am on the ${pageId} page`);

    await navigateToPage(page, pageId, globalConfig);

    await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
  }
);

Given(
  /^I am directed to the "([^"]*)" page$/,
  async function (this: ScenarioWorld, pageId: PageId) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I am directed to the ${pageId} page`);

    await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
  }
);

Given(
  /^I refresh the "([^"]*)" page$/,
  async function (this: ScenarioWorld, pageId: PageId) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`I refresh the ${pageId} page`);

    await reloadPage(page);

    await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig), {
      timeout: 30000,
    });
  }
);
