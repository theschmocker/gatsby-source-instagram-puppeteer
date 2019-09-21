const puppeteer = require('puppeteer');

module.exports.getImageURIs = async function getImageURIs(account) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://instagram.com/${account}`);

    const images = await page.$$eval(
        'main div article img',
        imgs => imgs.map(({ src, alt }) => ({
            src,
            alt
        }))
    );

    await browser.close();

    return images;
};