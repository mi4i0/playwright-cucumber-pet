import { After, Before, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { ScenarioWorld } from './worlds';
import { env, envNumber } from '../../env/parseEnv';

setDefaultTimeout(envNumber('SCRIPT_TIMEOUT'))

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {

  const contextOptions = {
    recordVideo: {
      dir: `${env('VIDEO_PATH')}${scenario.pickle.name}`,
    }
  }

  return await this.init(contextOptions)
})

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {

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