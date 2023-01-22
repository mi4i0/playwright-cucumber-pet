import { ElementHandle, Frame, Page } from 'playwright';
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

export const inputElementValue = async (
  page: Page,
  elementIdentifier: ElementLocator,
  input: string
): Promise<void> => {
  await page.focus(elementIdentifier);
  await page.fill(elementIdentifier, input);
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

export const scrollElementIntoView = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<void> => {
  const element = page.locator(elementIdentifier);
  await element.scrollIntoViewIfNeeded();
};

export const selectElementValue = async (
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
  const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
    return el.value;
  });
  return value;
};

export const getIframeElement = async (
  page: Page,
  iframeIdentifier: ElementLocator
): Promise<Frame | undefined | null> => {
  const elementHandle = await page.$(iframeIdentifier);
  const elementIframe = await elementHandle?.contentFrame();
  return elementIframe;
};

export const getAttributeText = async (
  page: Page,
  elementIdentifier: ElementLocator,
  attribute: string,
): Promise<string | null> => {
  const attributeText = page.locator(elementIdentifier).getAttribute(attribute);
  return attributeText;
};

export const elementChecked = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<boolean | null> => {
  const checked = await page.isChecked(elementIdentifier);
  return checked;
};

export const elementEnabled = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<boolean | null> => {
  const enabled = await page.isEnabled(elementIdentifier);
  return enabled;
};

export const getElementText = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<string | null> => {
  const text = await page.textContent(elementIdentifier);
  return text;
};

export const getElementTextAtIndex = async (
  page: Page,
  elementIdentifier: ElementLocator,
  index: number
): Promise<string | null> => {
  const textAtIndex = await page.textContent(`${elementIdentifier}>>nth=${index}`);
  return textAtIndex;
};

export const getElementValue = async (
  page: Page,
  elementIdentifier: ElementLocator
): Promise<string | null> => {
  const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
    return el.value;
  });
  return value;
};

export const getElement = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
  const element = await page.$(elementIdentifier);
  return element;
};

export const getElementAtIndex = async (
  page: Page,
  elementIdentifier: ElementLocator,
  index: number,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
  const elementAtIndex = await page.$(`${elementIdentifier}>>nth=${index}`);
  return elementAtIndex;
};

export const getElements = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<ElementHandle<SVGElement | HTMLElement>[]> => {
  const elements = await page.$$(elementIdentifier);
  return elements;
};

export const getElementWithinIframe = async (
  elementIframe: Frame,
  elementIdentifier: ElementLocator,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
  const visibleOnIframeElement = await elementIframe?.$(elementIdentifier);
  return visibleOnIframeElement;
};

export const getTextWithinIframeElement = async (
  elementIframe: Frame,
  elementIdentifier: ElementLocator,
): Promise<string | null> => {
  const textOnIframeElement = await elementIframe?.textContent(elementIdentifier);
  return textOnIframeElement;
};


export const getElementOnPage = async (
  page: Page,
  elementIdentifier: ElementLocator,
  pages: Array<Page>,
  pageIndex: number,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
  const elementOnPage = await pages[pageIndex].$(elementIdentifier);
  return elementOnPage;
};

export const getElementTextWithinPage = async (
  page: Page,
  elementIdentifier: ElementLocator,
  pages: Array<Page>,
  pageIndex: number,
): Promise<string | null> => {
  const textWithinPage = await pages[pageIndex].textContent(elementIdentifier);
  return textWithinPage;
};

export const getTitleWithinPage = async (
  page: Page,
  pages: Array<Page>,
  pageIndex: number,
): Promise<string | null> => {
  const titleWithinPage = await pages[pageIndex].title();
  return titleWithinPage;
};

export const getTableData = async (
  page: Page,
  elementIdentifier: ElementLocator,
): Promise<string> => {
  const table = await page.$$eval(elementIdentifier + " tbody tr", (rows) => {
    return rows.map(row => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map(cell => cell.textContent);
    });
  });
  return JSON.stringify(table);
};
