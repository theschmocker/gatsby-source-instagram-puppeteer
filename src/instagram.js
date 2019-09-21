const puppeteer = require('puppeteer');

module.exports.getImageURIs = async function getImageURIs(account) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://instagram.com/${account}`);

    // await autoScroll(page);

    const uris = await page.$$eval('main div article img', imgs => imgs.map(img => img.src));

    await browser.close();

    return uris;
};

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 250);
        });
    });
}