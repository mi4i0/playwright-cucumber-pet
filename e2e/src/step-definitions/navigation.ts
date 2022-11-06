import { Given } from '@cucumber/cucumber'
import { PageId } from '../env/global';
import {navigateToPage } from '../support/navigation-behavior';
import { ScenarioWorld } from './setup/worlds';

Given(
  /^I am on the "([^"]*)" page$/,
  async function (this: ScenarioWorld, pageId: PageId) {
    const {
      screen: {page},
      globalConfig,
      globalVariables,
    } = this;

    console.log(`'I\'m on the ${pageId} page'`);

    globalVariables.currentScreen = pageId

    await navigateToPage(page, pageId, globalConfig)
  }
)