import * as modules from './index.js';
const { caseData, delay, clickWhenEnabled, checkIDEnabled, isTargetElementSelected, waitForElementToBeSelectedAndPress, getElementId, getElementIds } = modules;
const { closeButton, continueButton, accessibilityMenu, playButton, nextButton, checkBox, dialogButton, answerButton, declineAcceptButton } = caseData;

// Modules
// expoAnim, docReader (Case File), docQuiz, animIntervention, conversation, picker, staticObs, aar (After Action Review/Report)
export async function conversation(page, runMode = 0.5) {
    console.log('Starting conversation module...');
    await delay(2);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
    await delay(1);
    let continueEnabled = false;
    while (!continueEnabled) {
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
        if (!continueEnabled) {
            console.log('Checking for dialog button...');
            let dialogEnabled = await checkIDEnabled(page, dialogButton.type, dialogButton.refId);
            console.log(dialogEnabled);
            if (dialogEnabled) {
                console.log(dialogButton.refId, ' Clicked!');
                await waitForElementToBeSelectedAndPress(page, dialogButton, runMode);
            }
        }
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
        if (!continueEnabled) {
            console.log('Checking for next button...');
            let nextEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
            console.log(nextEnabled);
            if (nextEnabled) {
                console.log(nextButton.refId, ' Clicked!');
                await waitForElementToBeSelectedAndPress(page, nextButton, runMode);
            }
        }
        await delay(runMode);
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    }
    console.log('Exiting conversation module...');
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function docQuiz(page, runMode = 0.5) {
    console.log('Starting docQuiz module...');
    await delay(2);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
    await delay(1);
    let continueEnabled = false;
    let checkboxEnabled = false;
    let nextEnabled = false;
    while (!continueEnabled) {
        console.log('Checking for checkbox...');
        checkboxEnabled = await checkIDEnabled(page, checkBox.type, checkBox.refId);
        console.log(checkboxEnabled);
        if (checkboxEnabled) {
            continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
            nextEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
            while (!continueEnabled && !nextEnabled) {
                await waitForElementToBeSelectedAndPress(page, checkBox, runMode);
                await delay(0.1);
                page.keyboard.press('Tab');
                continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
                nextEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
            }
        }
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
        if (!continueEnabled) {
            console.log('Checking for next button...');
            nextEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
            console.log(nextEnabled);
            if (nextEnabled) {
                console.log(nextButton.refId, ' Clicked!');
                await waitForElementToBeSelectedAndPress(page, nextButton, runMode);
            }
        }
        await delay(runMode);
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    }
    console.log('Exiting docQuiz module...');
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function animIntervention(page, runMode = 0.5) {
    console.log('Starting animIntervention module...');
    await delay(2);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
    await delay(1);
    let continueEnabled = false;
    while (!continueEnabled) {
        let questionsEnabled = await checkIDEnabled(page, answerButton.type, answerButton.refId);
        if (questionsEnabled) {
            console.log(answerButton.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, answerButton, runMode);
        }
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
        if (!continueEnabled) {
            console.log('Checking for next button...');
            let nextEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
            console.log(nextEnabled);
            if (nextEnabled) {
                console.log(nextButton.refId, ' Clicked!');
                await waitForElementToBeSelectedAndPress(page, nextButton, runMode);
            }
        }
        await delay(runMode);
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    }
    console.log('Exiting animIntervention module...');
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function picker(page, runMode = 0.5) {
    console.log('Starting picker module...');
    await delay(2);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
    await delay(1);
    let continueEnabled = false;
    let acceptEnabled = false;
    while (!continueEnabled) {
        console.log('Checking for accept button...');
        acceptEnabled = await checkIDEnabled(page, declineAcceptButton.accept.type, declineAcceptButton.accept.refId);
        console.log(acceptEnabled);
        if (acceptEnabled) {
            console.log(declineAcceptButton.accept.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, declineAcceptButton.accept, runMode);
        }
        await delay(runMode);
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    }
    console.log('Exiting picker module...');
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function extensivePicker(page, runMode = 0.5) {
    console.log('Starting extensive picker module...');
    await delay(2);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
    await delay(1);
    let continueEnabled = false;
    let denyEnabled = false;
    let acceptEnabled = false;
    let undoEnabled = false;
    while (!continueEnabled) {
        console.log('Checking for deny button...');
        denyEnabled = await checkIDEnabled(page, declineAcceptButton.decline.type, declineAcceptButton.decline.refId);
        console.log(denyEnabled);
        if (denyEnabled) {
            console.log(declineAcceptButton.decline.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, declineAcceptButton.decline, runMode);
        }
        await delay(1);
        console.log('Checking for undo button...');
        undoEnabled = await checkIDEnabled(page, declineAcceptButton.undo.type, declineAcceptButton.undo.refId);
        console.log(undoEnabled);
        if (undoEnabled) {
            console.log(declineAcceptButton.undo.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, declineAcceptButton.undo, runMode);
        }
        await delay(1);
        console.log('Checking for accept button...');
        acceptEnabled = await checkIDEnabled(page, declineAcceptButton.accept.type, declineAcceptButton.accept.refId);
        console.log(acceptEnabled);
        if (acceptEnabled) {
            console.log(declineAcceptButton.accept.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, declineAcceptButton.accept, runMode);
        }
        await delay(runMode);
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    }
    console.log('Exiting extensive picker module...');
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function staticObs(page, runMode = 0.5) {
    console.log('Starting staticObs module...');
    await delay(2);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
    await delay(1);
    let continueEnabled = false;
    while (!continueEnabled) {
        await delay(1);
        let responsesEnabled = await checkIDEnabled(page, answerButton.type, answerButton.refId);
        if (responsesEnabled) {
            console.log(answerButton.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, answerButton, runMode);
        }
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
        if (!continueEnabled) {
            console.log('Checking for next button...');
            let nextEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
            console.log(nextEnabled);
            if (nextEnabled) {
                console.log(nextButton.refId, ' Clicked!');
                await waitForElementToBeSelectedAndPress(page, nextButton, runMode);
            }
        }
        await delay(runMode);
    }
    console.log('Exiting staticObs module...');
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function assessmentResults(page, runMode = 0.5) {
    await delay(1);
    let continueEnabled = false;
    let responsesEnabled = false;
    while (!continueEnabled) {
        responsesEnabled = await checkIDEnabled(page, nextButton.type, nextButton.refId);
        if (responsesEnabled) {
            console.log(nextButton.refId, ' Clicked!');
            await waitForElementToBeSelectedAndPress(page, nextButton, runMode);
        }
        continueEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
        await delay(runMode);
    }
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function saveScreen(page, runMode = 0.5) {
    try {
        await page.click('text=No');
        await delay(1);
    }
    catch (e) {
        console.log('Keep going...');
    }
    await delay(1);
}

export async function infoScreen(page, runMode = 0.5) {
    await delay(1);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function helpCards(page, runMode = 0.5) {
    await delay(1);
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function expoAnim(page, expoAnimTimeLine) {
    await clickTimeline(page, expoAnimTimeLine);
}

export async function docReader(page, runMode = 0.5) {
    await delay(1);
    await waitForElementToBeSelectedAndPress(page, closeButton, runMode);
}

export async function clickTimeline(page, timeline, runMode = 0.5) {
    await delay(1);
    for (const step of timeline) {
        await waitForElementToBeSelectedAndPress(page, step, runMode);
    }
}

export async function AAR(page, runMode = 0.5, browser) {
    try {
        await delay(2);
        await browser.close();
        console.log('Browser closed successfully');
    } catch (error) {
        console.error('Failed to close the browser:', error);
    }
    finally {
        process.exit(0);
    }
}

export async function animation(page, runMode = 0.5) {
    await waitForElementToBeSelectedAndPress(page, playButton, runMode);
    let isEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    while (!isEnabled) {
        await delay(runMode);
        isEnabled = await checkIDEnabled(page, continueButton.type, continueButton.refId);
    }
    await waitForElementToBeSelectedAndPress(page, continueButton, runMode);
}

export async function lowerVolume(page, runMode) {
    await delay(1);
    await waitForElementToBeSelectedAndPress(page, accessibilityMenu.accessButton, runMode);
    while (!await isTargetElementSelected(page, accessibilityMenu.volumeSlider.refId)) {
        await page.keyboard.press('Tab');
        await delay(runMode);
    }
    let value = await page.evaluate(() => {
        const elem = document.activeElement;
        return elem.getAttribute('aria-valuenow');
    });
    while (value !== '0') {
        await page.keyboard.press('ArrowLeft');
        value = await page.evaluate(() => {
            const elem = document.activeElement;
            return elem.getAttribute('aria-valuenow');
        });
        await delay(0.1);
    }
    await waitForElementToBeSelectedAndPress(page, accessibilityMenu.close, runMode);
}