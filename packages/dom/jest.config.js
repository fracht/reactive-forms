const path = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    },
    setupFiles: [path.resolve(__dirname, '..', '..', '..', 'packages', 'dom', 'tests', 'enzyme.config.js')]
};
