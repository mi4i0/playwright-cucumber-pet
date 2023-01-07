import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';

When(/^I click (accept)?(dismiss)? on the alert dialog$/,
  async function (this: ScenarioWorld, acceptDialog: boolean, dismissDialog: boolean) {
    const {
      screen: {page},
    } = this;

    if (dismissDialog) {
      page.on('dialog', dialog => dialog.dismiss());
    } else {
      page.on('dialog', dialog => dialog.accept());
    }

  }
);