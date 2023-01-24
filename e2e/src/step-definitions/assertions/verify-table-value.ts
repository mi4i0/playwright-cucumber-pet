import { DataTable, Then } from '@cucumber/cucumber';
import { ElementKey } from '../../env/global';
import { ScenarioWorld } from '../setup/world';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor, waitForResult, waitForSelector } from '../../support/wait-for-behavior';
import { logger } from "../../logger";
import { getTableData } from "../../support/html-behavior";

Then(
  /^the "([^"]*)" table should( not)? equal the following:$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
    const {
      screen: {page},
      globalConfig,
    } = this;

    logger.log(`the ${elementKey} table should ${negate ? ' not' : ''}equal the following:`);

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
        const elementStable = await waitForSelector(page, elementIdentifier);

        if (elementStable) {
          const tableData = await getTableData(page, elementIdentifier);
          if (tableData === JSON.stringify(dataTable.raw()) === !negate) {
            return waitForResult.PASS;
          } else {
            return waitForResult.FAIL;
          }
        } else {
          return waitForResult.ELEMENTS_NOT_AVAILABLE;
        }
      },
      globalConfig,
      {
        target: elementKey,
        failureMessage: `🧨 Expected ${elementKey} ${negate ? 'not ' : ''}equal ${dataTable.raw()} 🧨`
      });
  }
);
