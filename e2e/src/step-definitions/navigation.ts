import { Given } from '@cucumber/cucumber'

Given(
  /^I am on the "([^"]*)" page$/,
  async function (pageId: string) {
    console.log(`'I\'m on the ${pageId} page'`);

    await global.page.goto('http://localhost:3000/')
}
)