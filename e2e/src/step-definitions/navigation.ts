import { Given } from '@cucumber/cucumber';
import { PageId } from '../env/global';
import { currentPathMatchesPageId, navigateToPage } from '../support/navigation-behavior';
import { ScenarioWorld } from './setup/world';
import { waitFor } from '../support/wait-for-behaviour';

Given(
  /^I am on the "([^"]*)" page$/,
  async function (this: ScenarioWorld, pageId: PageId) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I'm on the ${pageId} page`);

    await navigateToPage(page, pageId, globalConfig);

    await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
  }
);

Given( /^I am directed to the "([^"]*)" page$/,
  async function (this: ScenarioWorld, pageId: PageId) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    console.log(`I am directed to the ${pageId}`);

    await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
  });