import { launch } from 'puppeteer';
import delay from '../modules/delay.js';
import { clickWhenEnabled, checkIDEnabled, getElementId, getElementIds } from '../modules/elementUtils.js';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport:
    {
      width: 1920,
      height: 1080
    }
  });

  const autoMode = 0;
  const obsMode = 0.5;
  const runMode = autoMode;
  
  const page = await browser.newPage();

  await page.goto('https://dev2.breakawaygames.net/BreakawayDevAspirePortal/Aspire/AssessmentLauncher');
  await page.click('text=Aspire Parkinson\u2019s Disease COTA');
  await delay(2);
  let tabs = await browser.pages();
  const page2 = tabs[tabs.length - 1];
  await delay(2);

  try {
    await page2.click('text=No');
  }
  catch (e) {
    console.log('Keep going...');
  }
  await delay(2);

  await waitForElementToBeSelectedAndPress(page2, 'Continue');
  await introAndOutro(page2, 'Play', 'Continue', runMode);
  await waitForElementToBeSelectedAndPress(page2, 'Continue');
  await waitForElementToBeSelectedAndPress(page2, 'Continue');

  //await browser.close();
})();

async function isTargetElementSelected(page, selector) {
  return page.evaluate((sel) => {
    const elem = document.activeElement;
    return elem.id.includes(sel);
  }, selector);
}

async function waitForElementToBeSelectedAndPress(page, selector, timeout = 60000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await isTargetElementSelected(page, selector)) {
      page.keyboard.press('Enter');
      return true;
    }
    await page.keyboard.press('Tab');
    await delay(runMode);
  }
  return false;
}

async function introAndOutro(page, playButton, continueButton, runMode) {
  await waitForElementToBeSelectedAndPress(page, playButton);
  let isEnabled = await checkIDEnabled(page, 'button', continueButton);
  while (!isEnabled) {
    await delay(runMode);
    isEnabled = await checkIDEnabled(page, 'button', continueButton);
  }
  await waitForElementToBeSelectedAndPress(page, continueButton);
}