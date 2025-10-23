import { launch } from 'puppeteer';
import delay from '../modules/delay.js';
import sharp from 'sharp';
// TOTAL TIME: 9:50
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
  const page = await browser.newPage();

  //colors
  const stay = {
    r: 74,
    g: 84,
    b: 132,
  };
  const xColor = {
    r: 157,
    g: 163,
    b: 205,
  };

  //pixel locations
  const next = {
    xClick: 1400,
    yClick: 725,
    clip: {
      x: 1400,
      y: 725,
      width: 2,
      height: 2
    },
    color: {
      r: 30,
      g: 44,
      b: 140
    },
    xCheck: 1,
    yCheck: 1,
    checkImg: 'next.png'
  };
  const play = {
    xClick: 880,
    yClick: 725,
    clip: {
      x: 880,
      y: 725,
      width: 2,
      height: 2
    },
    color: {
      r: 29,
      g: 44,
      b: 140
    },
    xCheck: 1,
    yCheck: 1,
    checkImg: 'play.png'
  };
  /*const next = {
    xClick: 1400,
    yClick: 725,
    clip: {
      x: 1230,
      y: 690,
      width: 220,
      height: 70
    },
    color: {
      r: 30,
      g: 44,
      b: 140
    },
    xCheck: 170,
    yCheck: 40,
    checkImg: 'next.png'
  };*/
  /*const play = {
    xClick: 880,
    yClick: 725,
    clip: {
      x: 850,
      y: 695,
      width: 220,
      height: 70
    },
    color: {
      r: 29,
      g: 44,
      b: 140
    },
    xCheck: 33,
    yCheck: 33,
    checkImg: 'play.png'
  };*/

  // Navigate the page to a URL
  await page.goto('https://dev2.breakawaygames.net/BreakawayDevAspirePortal/Aspire/AssessmentLauncher');

  // Click on ASP PD and make new tab
  await page.waitForSelector("text=Aspire Parkinson\u2019s Disease COTA");
  await page.click("text=Aspire Parkinson\u2019s Disease COTA");
  await delay(3);
  let tabs = await browser.pages();
  const page2 = tabs[tabs.length-1];

  // Begin Case
  await page2.mouse.click(990, 205);

  await waitForPixelColorAndClick(page2, next, next.xClick, next.yClick);
  await waitForPixelColorAndClick(page2, play, play.xClick, play.yClick);

  // Lower Volume
  /*await delay(2);
  await page2.mouse.click(1435, 52);
  await delay(1);
  await page2.mouse.move(1135, 370);
  await page2.mouse.down();
  await page2.mouse.move(910, 370);
  await page2.mouse.up();
  await delay(2);
  await page2.mouse.move(1250, 285);
  await page2.mouse.click(1250, 285);*/

  await waitForPixelColorAndClick(page2, next, next.xClick, next.yClick);
  await waitForPixelColorAndClick(page2, next, next.xClick, next.yClick);
  await waitForPixelColorAndClick(page2, next, next.xClick, next.yClick);
  await waitForPixelColorAndClick(page2, 'fullpage.png', 1385, 70, xColor, 1385, 70);

  /*wait delay(2);
  await page2.mouse.click(730, 180);
  await delay(1);
  await page2.mouse.click(1385, 70);
  await delay(3);
  await page2.mouse.click(1350, 730);
  await delay(5);
  await page2.mouse.click(1350, 730);*/

  // Interview
  await delay(3);
  interview();
  await page.mouse.click(next.x, next.y);
  /*await delay(2);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(4);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(7);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(8);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(9);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(8);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(12);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(10);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(25);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(19);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(4);
  await page2.mouse.click(730, 510);
  await delay(1);
  await page2.mouse.click(1350, 730);*/
  

  // Intervention Methods
  await delay(3);
  await page2.mouse.click(1385, 730);
  await delay(3);
  await page2.mouse.click(1385, 730);
  for (let i = 0; i < 10; i++) {
    await delay(1.5);
    await page2.mouse.click(1385, 630);
    await delay(0.5);
    await page2.mouse.click(1385, 530);
    await delay(0.5);
    await page2.mouse.click(1385, 440);
    await delay(1);
    await page2.mouse.click(1085, 730);
  }
  await page2.mouse.click(1350, 730);

  // ADL Strategies
  await delay(3);
  await page2.mouse.click(1350, 730);
  await delay(5);
  await page2.mouse.click(1350, 730);
  await delay(12);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(17);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(31);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(14);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(9);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(6);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(12);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1085, 730);
  await delay(12);
  await page2.mouse.click(660, 600);
  await delay(1);
  await page2.mouse.click(1350, 730);

  // Interventions
  await delay(5);
  await page2.mouse.click(1350, 730);
  await delay(3);
  await page2.mouse.click(1350, 730);
  for (let i = 0; i < 9; i++) {
    await delay(1.5);
    await page2.mouse.click(1385, 630);
    await delay(0.5);
    await page2.mouse.click(1385, 530);
    await delay(0.5);
    await page2.mouse.click(1385, 440);
    await delay(1);
    await page2.mouse.click(1085, 730);
  }
  await page2.mouse.click(1350, 730);

  // Caregiver Education
  await delay(3);
  await page2.mouse.click(1350, 730);
  await delay(3);
  await page2.mouse.click(1350, 730);
  await delay(3);
  for (let i = 0; i < 11; i++) {
    await page2.mouse.click(1040, 550);
    await delay(2.5);
  }
  await page2.mouse.click(1350, 730);

  // Conclusion Slides
  await delay(3);
  await page2.mouse.click(1350, 730);
  await delay(3);
  await page2.mouse.click(1350, 730);
  await delay(2);
  await page2.mouse.click(970, 730);
  await delay(58);
  await page2.mouse.click(1350, 730);
  await delay(3);
  await browser.close();
  
  //await page2.screenshot({path: 'fullpage.png', fullPage: true});
})();

async function waitForPixelColorAndClick(page, check, clickX, clickY) {
  await page.mouse.move(0, 0);
  let colorMatches = false;
  while (!colorMatches) {
    await delay(2);
    await page.screenshot({ path: check.checkImg, clip: check.clip });
    const pixelColor = await getColor(check.checkImg, check.xCheck, check.yCheck);
    console.log(`RGBA at (${clickX}, ${clickY}):`, pixelColor);
    colorMatches = compareColors(pixelColor, check.color);
  }
    try {
      await delay(1);
      await page.mouse.move(clickX, clickY);
      await page.mouse.down();
      await delay(0.5);
      await page.mouse.up();
    } catch (error) {
      console.log('Error clicking:', error);
    }
}

/*async function interview(page, screenshotPath, x, y, expectedColor, clickX, clickY, testColor) {
  await page.mouse.move(0, 0); 
  let colorMatches = false;
  do {
    await page.screenshot({ path: screenshotPath, fullPage: true });
    const pixelColor = await getColor(screenshotPath, x, y);
    colorMatches = compareColors(pixelColor, expectedColor);
    if (!colorMatches) {
      await waitForPixelColorAndClick(page, 'fullpage.png', 730, 510, testColor, 730, 510);
      await page.mouse.click(730, 510);
      await waitForPixelColorAndClick(page, 'fullpage.png', 1085, 730, testColor, 1085, 730);
      await page.mouse.click(1085, 730);
    }
  } while (!colorMatches);
  await page.mouse.click(clickX, clickY);
}*/

async function getColor(imagePath, x, y) {
  const image = sharp(imagePath);
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  const width = await image.metadata().then(metadata => metadata.width);
  const pixelIndex = (y * width + x) * 4;
  const pixelColor = {
    r: data[pixelIndex],
    g: data[pixelIndex + 1],
    b: data[pixelIndex + 2],
    a: data[pixelIndex + 3]
  };
  return pixelColor;
}

function compareColors(color1, color2) {
  return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
}