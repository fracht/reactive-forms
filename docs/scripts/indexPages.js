const getRoutesConfig = require('../src/utils/getPagesConfig');
const fs = require('fs');

fs.writeFileSync('./indexes/pages.json', JSON.stringify(getRoutesConfig('pages'), undefined, 4));
