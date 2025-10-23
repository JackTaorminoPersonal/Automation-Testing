import { Browser, BrowserContext, launch } from 'puppeteer';
import * as modules from '../modules/index.js';
const { delay, caseData, saveScreen, titleCards, introAndOutro, helpCards, docReader, conversation, docQuiz, animIntervention, picker, extensivePicker, AAR } = modules;
const { closeButton, continueButton, accessibilityMenu, playButton, nextButton, checkBox, dialogButton,  answerButton, declineAcceptButton } = caseData;

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
    await page.waitForSelector("text=Aspire Rheumatoid Arthritis and Depression");
    await page.click("text=Aspire Rheumatoid Arthritis and Depression");
    await delay(2);
    let tabs = await browser.pages();
    const page2 = tabs[tabs.length - 1];

    // Case File Timeline
    const caseFileTimeLine = [
        closeButton
    ];

    // Timeline for the case
    const caseTimeline = [
        await saveScreen(page2),
        await titleCards(page2, continueButton, runMode, accessibilityMenu, true),
        await introAndOutro(page2, playButton, continueButton, runMode),
        await helpCards(page2, continueButton, runMode),
        await titleCards(page2, continueButton, runMode),
        await docReader(page2, caseFileTimeLine),
        await titleCards(page2, continueButton, runMode),
        await picker(page2, continueButton, declineAcceptButton, runMode)
    ];
    caseTimeline;
})();