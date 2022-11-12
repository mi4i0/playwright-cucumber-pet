import { Page } from 'playwright';
import { ElementKey, ElementLocator, GlobalConfig } from '../env/global';
import { getCurrentPageId } from './navigation-behavior';

export const getElementLocator = (
  page: Page,
  elementKey: ElementKey,
  globalConfig: GlobalConfig,
): ElementLocator => {

  const currentPage = getCurrentPageId(page, globalConfig);

  const {pageElementMappings} = globalConfig;

  const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
  if (!elementIdentifier) {
    throw Error(`Identifier "${elementKey}" doesn't exist in "${currentPage}" or "Common" mappings`);
  }

  return elementIdentifier;
};
