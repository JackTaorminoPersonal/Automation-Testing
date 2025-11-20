import { Browser, BrowserContext, launch } from 'puppeteer';

export function delay(time) {
    time *= 1000
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
}

export async function getElementIds(page, type) {
    let ids = await page.evaluate((type) => {
        return Array.from(document.querySelectorAll(type), element => element.id);
    }, type);
    return ids;
}

export async function getElementId(page, type, referenceId, cnt) {
    let count = cnt;
    let ids = await getElementIds(page, type);
    if (ids.length !== null) {
        for (const element of ids) {
            if (element.includes(referenceId)) {
                return '#' + element;
            }
        }
    }
    count++;
    if (count >= 60) // 60 passes at 2 seconds each of waiting for the element to appear
    {
        return null;
    }
    await delay(2);
    console.log('Element not found, trying again...');
    return await getElementId(page, type, referenceId, count);
}

export async function checkIDEnabled(page, type, refId) {
    let id = await getElementId(page, type, refId, 0);
    await page.waitForSelector(id, { timeout: 600000 });
    const element = await page.$(id);
    if (element !== null) {
        try {
            let isDisabled = await page.evaluate(id => {
                const element = document.querySelector(id);
                return element ? element.disabled : null;
            }, id);
            return !isDisabled;
        }
        catch (e) {
            console.log('Attribute not found');
        }
    }
    return false;
}

export async function isTargetElementSelected(page, selector) {
    return page.evaluate((sel) => {
        const elem = document.activeElement;
        return elem.id.includes(sel);
    }, selector);
}

export async function waitForElementToBeSelectedAndPress(page, selector, runMode = 0.5) {
    const startTime = Date.now();
    const timeout = 60000; // 60 seconds timeout
    await delay(0.5);
    while (Date.now() - startTime < timeout) {
        if (await isTargetElementSelected(page, selector.refId)) {
            console.log(`Element with ID ${selector.refId} is selected.`);
            page.keyboard.press('Space');
            return true;
        }
        await page.keyboard.press('Tab');
        await delay(runMode);
    }
    return false;
}

export async function openBrowserAndNavigate(type, name) {
    const browser = await launch({
        headless: false,
        args: [`--window-size=1920,1080`],
        defaultViewport:
        {
            width: 1920,
            height: 1080
        }
    });
    name = name.replace(/'/g, "\u2019").trim().normalize();

    const launcher = await browser.newPage();
    if (type === 'ASP') {
        await launcher.goto('https://dev2.breakawaygames.net/BreakawayDevAspirePortal/Aspire/AssessmentLauncher');
    } else if (type === 'NAV') {
        await launcher.goto('https://dev2.breakawaygames.net/NBCOTNavLauncher');
    }
    await launcher.waitForSelector(`text=${name}`, { timeout: 10000 });
    await launcher.click(`text=${name}`);
    await delay(2);
    let tabs = await browser.pages();
    const page2 = tabs[tabs.length - 1];
    return { browser, page: page2 };
}

export async function clickWhenEnabled(page, element) {
    let enabled = false;
    while (!enabled) {
        await delay(0.5);
        enabled = await checkIDEnabled(page, element.type, element.refId);
    }
    await page.mouse.click(element.x, element.y);
} // NOT IN USE