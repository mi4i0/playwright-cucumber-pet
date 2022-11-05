import playwright, { Browser, BrowserContext, BrowserContextOptions, Page } from 'playwright';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserType } from '@playwright/test';
import { env } from '../../env/parseEnv';
import { GlobalConfig } from '../../../env/global';

export type Screen = {
  browser: Browser,
  context: BrowserContext,
  page: Page
}

export class ScenarioWorld extends World {
  constructor(options: IWorldOptions) {
    super(options);

    this.globalConfig = options.parameters as GlobalConfig;
  }

  globalConfig: GlobalConfig;
  screen!: Screen;

  async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
    await this.screen?.page?.close();
    await this.screen?.context?.close();
    await this.screen?.browser?.close();

    const browser = await this.newBrowser();
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    this.screen = {browser, context, page};

    return this.screen;
  }

  private newBrowser = async (): Promise<Browser> => {

    const automationBrowsers = ['chromium', 'firefox', 'webkit'];
    type AutomationBrowser = typeof automationBrowsers[number];
    const automationBrowser = env('UI_AUTOMATION_BROWSER') as AutomationBrowser

    const browserType: BrowserType = playwright[automationBrowser]

    return await browserType.launch({
      headless: process.env.HEADLESS !== 'false',
      args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process']
    });
  }
}

setWorldConstructor(ScenarioWorld)