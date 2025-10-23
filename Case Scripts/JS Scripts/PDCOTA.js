import { Browser, BrowserContext, launch } from 'puppeteer';
import * as modules from '../modules/index.js';
const { delay, caseData, saveScreen, titleCards, introAndOutro, helpCards, docReader, conversation, docQuiz, animIntervention, picker, extensivePicker, AAR } = modules;
const { closeButton, continueButton, accessibilityMenu, playButton, nextButton, checkBox, dialogButton, answerButton, declineAcceptButton } = caseData;

const autoMode = 0.25;
const obsMode = 0.5;
const runMode = obsMode;

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
    await page.goto('https://dev2.breakawaygames.net/BreakawayDevAspirePortal/Aspire/AssessmentLauncher');
    await page.waitForSelector("text=Aspire Parkinson\u2019s Disease COTA");
    await page.click("text=Aspire Parkinson\u2019s Disease COTA");
    await delay(2);
    let tabs = await browser.pages();
    const page2 = tabs[tabs.length - 1];

    // Case File Timeline
    const caseFileTimeLine = [
        closeButton
    ];

    // Timeline for the case
    const caseTimeline = [
        await saveScreen(page2, runMode),
        await titleCards(page2, runMode, true),
        await introAndOutro(page2, runMode),
        await helpCards(page2, runMode),
        await titleCards(page2, runMode),
        await docReader(page2, runMode),
        await titleCards(page2, runMode),
        await conversation(page2, runMode),
        await titleCards(page2, runMode),
        await docQuiz(page2, runMode),
        await titleCards(page2, runMode),
        await animIntervention(page2, runMode),
        await titleCards(page2, runMode),
        await docQuiz(page2, runMode),
        await titleCards(page2, runMode),
        await extensivePicker(page2, runMode),
        await titleCards(page2, runMode),
        await introAndOutro(page2, runMode),
        await AAR(browser)
    ];
    caseTimeline;
})();