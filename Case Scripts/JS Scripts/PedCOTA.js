import { Browser, BrowserContext, launch } from 'puppeteer';
import delay from '../modules/delay.js';
import { conversation, docQuiz, animIntervention, picker, staticObs, AAR, docReader, expoAnim, clickTimeline, saveScreen, lowerVolume } from '../modules/caseModules.js';
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

    const page = await browser.newPage();
    await page.goto('https://dev2.breakawaygames.net/BreakawayDevAspirePortal/Aspire/AssessmentLauncher');
    await page.waitForSelector("text=Aspire Pediatrics COTA");
    await page.click("text=Aspire Pediatrics COTA");
    await delay(2);
    let tabs = await browser.pages();
    const page2 = tabs[tabs.length - 1];

    //Button information
    //Modularize the coordinates?
    const continueButton =
    {
        page: page2,
        type: 'button',
        refId: 'Continue',
        x: 1400,
        y: 725
    };
    const playButton =
    {
        page: page2,
        type: 'button',
        refId: 'Play',
        x: 880,
        y: 725
    };
    const closeButton =
    {
        page: page2,
        type: 'button',
        refId: 'Close',
        x: 1385,
        y: 70
    };
    const dialogButton =
    {
        page: page2,
        type: 'button',
        refId: 'ConvoList',
        x: 580,
        y: 475
    };
    const nextButton =
    {
        page: page2,
        type: 'button',
        refId: 'Next',
        x: 1075,
        y: 725
    };
    const previousButton =
    {
        page: page2,
        type: 'button',
        refId: 'Prev',
        x: 850,
        y: 725
    };
    const checkBox =
    {
        page: page2,
        type: 'input[type="checkbox"]',
        refId: 'Checkbox',
        coords: {
            coord1: {
                x: 1210,
                y: 200
            },
            coord2: {
                x: 1210,
                y: 285
            },
            coord3: {
                x: 1210,
                y: 370
            },
            coord4: {
                x: 1210,
                y: 460
            },
            coord5: {
                x: 1210,
                y: 540
            },
            coord6: {
                x: 1210,
                y: 630
            }
        }
    };
    const answerButton =
    {
        page: page2,
        type: 'button',
        refId: 'ToggleButton',
        x: 1270,
        y: 600
    };
    const denyAcceptButton =
    {
        page: page2,
        accept: {
            type: 'button',
            refId: 'Accept',
            x: 1050,
            y: 545
        },
        deny: {
            type: 'button',
            refId: 'Deny',
            x: 880,
            y: 545
        }
    };
    const responseButton =
    {
        page: page2,
        type: 'button',
        refId: 'ToggleButton',
        x: 1190,
        y: 515
    }

    // Modules
    // expoAnim, docReader (Case File), docQuiz, animIntervention, conversation, picker, staticObs, aar (After Action Review/Report)

    // expoAnim Module
    const expoAnimTimeLine = [
        playButton,
        continueButton
    ];

    // Title Cards Timeline
    const titleCardsTimeLine = [
        continueButton
    ];

    // Help Card Timeline
    const helpCardTimeLine = [
        continueButton
    ];

    // Case File Timeline
    const caseFileTimeLine = [
        closeButton
    ];

    // Timeline for the case
    const caseTimeline = [
        await saveScreen(page2),
        await lowerVolume(page2),
        await expoAnim(titleCardsTimeLine),
        await expoAnim(expoAnimTimeLine),
        await expoAnim(helpCardTimeLine),
        await expoAnim(titleCardsTimeLine),
        await docReader(caseFileTimeLine),
        await expoAnim(titleCardsTimeLine),
        await docQuizRandom(continueButton, nextButton, previousButton, checkBox),
        await expoAnim(titleCardsTimeLine),
        await staticObs(continueButton, nextButton, responseButton),
    ];
    caseTimeline;
})();
async function docQuizRandom(continueButton, nextButton, previousButton, checkBox) {
    await clickWhenEnabled(continueButton);
    let continueEnabled = false;
    let checkboxEnabled = false;
    let nextEnabled = false;
    let previousEnabled = false;
    await delay(1);
    while (!continueEnabled) {
        console.log('Checking for checkbox...');
        checkboxEnabled = await checkIDEnabled(checkBox.page, checkBox.type, checkBox.refId);
        console.log(checkboxEnabled);
        if (checkboxEnabled) {
            console.log(checkBox.refId, ' Clicked!');
            nextEnabled = await checkIDEnabled(nextButton.page, nextButton.type, nextButton.refId);
            while (!(nextEnabled || continueEnabled)) {
                let randCoord = 'coord' + (Math.floor(Math.random() * 6) + 1);
                await checkBox.page.mouse.click(checkBox.coords[randCoord].x, checkBox.coords[randCoord].y);
                await delay(0.25);
                nextEnabled = await checkIDEnabled(nextButton.page, nextButton.type, nextButton.refId);
                continueEnabled = await checkIDEnabled(continueButton.page, continueButton.type, continueButton.refId);
            }
        }
        let randomNum = Math.floor(Math.random() * 4) + 1;
        previousEnabled = await checkIDEnabled(previousButton.page, previousButton.type, previousButton.refId);
        console.log(previousEnabled, " ", randomNum);
        if (previousEnabled && randomNum == 1) {
            console.log(previousButton.refId, ' Clicked!');
            await previousButton.page.mouse.click(previousButton.x, previousButton.y);
        }
        continueEnabled = await checkIDEnabled(continueButton.page, continueButton.type, continueButton.refId);
        if (!continueEnabled) {
            console.log('Checking for next button...');
            nextEnabled = await checkIDEnabled(nextButton.page, nextButton.type, nextButton.refId);
            console.log(nextEnabled);
            if (nextEnabled) {
                console.log(nextButton.refId, ' Clicked!');
                await nextButton.page.mouse.click(nextButton.x, nextButton.y);
            }
        }
        await delay(0.5);
        continueEnabled = await checkIDEnabled(continueButton.page, continueButton.type, continueButton.refId);
    }
    console.log(continueButton.refId, ' Clicked!');
    await continueButton.page.mouse.click(continueButton.x, continueButton.y);
}