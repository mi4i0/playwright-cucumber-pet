import { Frame, Page } from 'playwright';
import { ElementLocator } from '../env/global';

export const clickElement = async (
  page: Page,
  elementIdentifier: ElementLocator
): Promise<void> => {
  await page.click(elementIdentifier);
};

export const clickElementAtIndex = async (
  page: Page,
  elementIdentifier: ElementLocator,
  elementPosition: number,
): Promise<void> => {
  const element = await page.$(`${elementIdentifier}>>nth=${elementPosition}`);
  await element?.click();
};

export const inputValue = async (
  page: Page,
  elementIdentifier: ElementLocator,
  input: string
): Promise<void> => {
  await page.focus(elementIdentifier);
  await page.fill(elementIdentifier, input);
};

export const selectValue = async (
  page: Page,
  elementIdentifier: ElementLocator,
  option: string
): Promise<void> => {
  await page.focus(elementIdentifier);
  await page.selectOption(elementIdentifier, option);
};

export const checkElement = async (
  page: Page,
  elementIdentifier: ElementLocator
): Promise<void> => {
  await page.check(elementIdentifier);
};

export const uncheckElement = async (
  page: Page,
  elementIdentifier: ElementLocator
): Promise<void> => {
  await page.uncheck(elementIdentifier);
};

export const getValue = async (
  page: Page,
  elementIdentifier: ElementLocator
): Promise<string | null> => {
  await page.waitForSelector(elementIdentifier);
  const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
    return el.value;
  });
  return value;
};

export const getIframeElement = async (
  page: Page,
  iframeIdentifier: ElementLocator
): Promise<Frame | undefined | null> => {
  await page.waitForSelector(iframeIdentifier);
  const elementHandle = await page.$(iframeIdentifier);
  const elementIframe = await elementHandle?.contentFrame();
  return elementIframe;
};

export const inputValueOnIframe = async (
  elementIframe: Frame,
  elementIdentifier: ElementLocator,
  inputValue: string
): Promise<void> => {
  await elementIframe.fill(elementIdentifier, inputValue);
};

export const inputValueOnPage = async (
  pages: Array<Page>,
  pageIndex: number,
  elementIdentifier: ElementLocator,
  inputValue: string,
): Promise<void> => {
  await pages[pageIndex].focus(elementIdentifier);
  await pages[pageIndex].fill(elementIdentifier, inputValue);
};

export const getAttributeText = async (
  page: Page,
  elementIdentifier: ElementLocator,
  attribute: string,
): Promise<string | null> => {
  const attributeText = page.locator(elementIdentifier).getAttribute(attribute);
  return attributeText;
};

export const scrollIntoView = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<void> => {
  const element = page.locator(elementIdentifier);
  await element.scrollIntoViewIfNeeded();
};