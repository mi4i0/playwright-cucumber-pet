import { Given } from '@cucumber/cucumber'

Given(
  /^I am on the home page$/,
  async function () {
    console.log('I\'m on the home page');

    await global.page.goto('http://localhost:3000/')
}
)