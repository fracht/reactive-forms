const docgen = require('react-docgen-typescript');
const yargs = require('yargs/yargs');
const fs = require('fs');
const { render } = require('ejs');
const { join, relative } = require('path');
const minimatch = require('minimatch');
const { startCase } = require('lodash');

let {
    tsconfig,
    _: [, , ...src],
    out,
    base,
    exclude
} = yargs(process.argv).argv;

let parser;

if (tsconfig) {
    parser = docgen.withCustomConfig(tsconfig);
} else {
    parser = docgen.withDefaultConfig();
}

if (!out) {
    throw new Error('No output path specified.');
}

if (!src) {
    throw new Error('No source path specified.');
}

if (!base) {
    throw new Error('No base path specified');
}

if (exclude) {
    if (typeof exclude === 'string') {
        exclude = [exclude];
    }
    src = src.filter((path) => !exclude.some((exclusionPath) => minimatch(path, exclusionPath, { matchBase: true })));
}

const componentTemplate = fs.readFileSync(join(__dirname, './templates/component.ejs')).toString();
const folderMetaTemplate = fs.readFileSync(join(__dirname, './templates/folderTemplate.ejs')).toString();

const registeredDirs = {};

for (const path of src) {
    const component = parser.parse(path)[0];

    if (component) {
        const relativePath = relative(base, path);

        const newPath = join(out, relativePath.replace(/\.\w+$/g, '') + '.md');

        const dir = newPath.substring(0, newPath.lastIndexOf('/'));

        fs.mkdirSync(dir, { recursive: true });

        if (!registeredDirs[dir]) {
            registeredDirs[dir] = true;
            fs.writeFileSync(
                join(dir, 'index.md'),
                render(folderMetaTemplate, { folderName: startCase(dir.substring(dir.lastIndexOf('/') + 1)) })
            );
        }

        try {
            fs.writeFileSync(newPath, render(componentTemplate, component));
        } catch (err) {
            console.error(err);
        }
    }
}
