import { After, Before, ITestCaseHookParameter } from '@cucumber/cucumber';
import { ScenarioWorld } from './worlds';
import { env } from '../../env/parseEnv';



Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  console.log(`Running cucumber scenario ${scenario.pickle.name}`)

  const contextOptions = {
    recordVideo: {
      dir: `${env('VIDEO_PATH')}${scenario.pickle.name}`,
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
    const screenshot = await page.screenshot({
      path: `${env('SCREENSHOT_PATH')}${scenario.pickle.name}.png`
    });
    await this.attach(screenshot, 'image/png')
  }

  await browser.close();

  return browser;
})