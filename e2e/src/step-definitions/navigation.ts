import { Given } from '@cucumber/cucumber'

Given(
  /^I am on the "([^"]*)" page$/,
  async function (pageId: string) {
      const {
          screen: {page}
      } = this;

    console.log(`'I\'m on the ${pageId} page'`);

    await page.goto('http://localhost:3000/')
}
)