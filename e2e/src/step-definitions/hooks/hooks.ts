import { After, AfterAll, Before, BeforeAll, ITestCaseHookParameter } from '@cucumber/cucumber';

const {chromium} = require("playwright");

BeforeAll(async () => {
  global.browser = await chromium.launch({
    headless: false,
  })
})

AfterAll((async () => {
  await global.browser.close();
}))

Before(async (scenario: ITestCaseHookParameter) => {
  global.context = await global.browser.newContext({
    recordVideo: {
      dir: './reports/videos ' + scenario.pickle.name,
    }
  })

  global.page = await global.context.newPage();
})

After(async (scenario: ITestCaseHookParameter) => {
  const scenarioStatus = scenario.result?.status;

  if (scenarioStatus === 'FAILED'){
    await global.page.screenshot({
      path: `./reports/screenshot/${scenario.pickle.name}.png`
    })
  }

  await global.page.close();
})