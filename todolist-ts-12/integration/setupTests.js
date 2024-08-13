// const { toMatchImageSnapshot } = require('jest-image-snapshot');
//
// expect.extend({ toMatchImageSnapshot });


const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 });
});