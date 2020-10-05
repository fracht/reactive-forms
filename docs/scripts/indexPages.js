const fs = require('fs');
const getPagesConfig = require('../src/utils/getPagesConfig');
const flatPagesConfig = require('../src/utils/flatPagesConfig');

const pagesConfig = getPagesConfig('pages');

fs.writeFileSync('./indexes/pages.json', JSON.stringify(pagesConfig, undefined, 4));
fs.writeFileSync('./indexes/pages-map.json', JSON.stringify(flatPagesConfig(pagesConfig), undefined, 4));
