import * as modules from '../../modules/index.js';
const { openBrowserAndNavigate } = modules;
import { promises as fs } from 'fs';

const autoMode = 0.25;
const obsMode = 0.5;
const runMode = obsMode;

(async () => {

    await fs.writeFile('../Results.txt', 'Test Results for ' + new Date().toLocaleDateString() + '\n\n');

    async function readExecuteCases(filePath) {
        const content = await fs.readFile(filePath, 'utf-8');
        const lines = content.split('\n').map(line => line.trim()).filter(Boolean);

        for (const line of lines) {
            try {
                console.log('Starting test case:', line);
                let result = await runStepsFromFile('../' + line + '.txt');
                console.log(`${line}: ${result}`);
                await fs.appendFile('../Results.txt', `${line}: ${result}\n`);
            } catch (e) {
                await fs.appendFile('../Results.txt', `${line}: Program Crash\n`);
            }
        }
    }

    async function runStepsFromFile(filePath) {
        const content = await fs.readFile(filePath, 'utf-8');
        const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
        const { browser, page } = await openBrowserAndNavigate(lines[0], lines[1]);
        lines.shift();
        lines.shift();
        for (const line of lines) {
            const [action] = line.split(' ');
            const fn = modules[action];
            if (fn) {
                const args = [];
                args.push(page);
                args.push(runMode);
                if (action === 'AAR') args.push(browser);
                try {
                    await fn(...args);
                } catch (e) {
                    browser.close();
                    return 'Failed - Error in action: ' + action;
                }
            }
        }
        return 'Passed';
    }

    await readExecuteCases('../ExecuteCases.txt');
})();