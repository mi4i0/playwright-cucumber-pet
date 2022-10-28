import { After, Before, ITestCaseHookParameter } from '@cucumber/cucumber';
import { ScenarioWorld } from './worlds';

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  console.log(`Running cucumber scenario ${scenario.pickle.name}`)

  const contextOptions = {
    recordVideo: {
      dir: './reports/videos ' + scenario.pickle.name,
    }
  }

  return await this.init(contextOptions)
})

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  console.log(`Ending cucumber scenario ${scenario.pickle.name}`)

  const {
    screen: {
      page, browser
    }
  } = this

  const scenarioStatus = scenario.result?.status;

  if (scenarioStatus === 'FAILED') {
    await page.screenshot({
      path: `./reports/screenshot/${scenario.pickle.name}.png`
    })
  }

  await browser.close();

  return browser;
})