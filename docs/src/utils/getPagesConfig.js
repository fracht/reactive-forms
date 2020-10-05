const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const fileRegexp = /\.mdx?$/;

const getFileMetadata = (path) => {
    const file = fs.readFileSync(path).toString();
    const { data } = matter(file);
    return data;
};

/**
 * @param {string} path
 * @param {string} basePath
 */
const pathToLink = (path, basePath) => {
    const indexOf = path.indexOf(basePath);
    if (indexOf !== -1) {
        path = path.substring(indexOf + basePath.length);
    }
    path = path.replace(/^[\\|/]/, '');
    path = path.replace('\\', '/');
    path = path.replace(/\.mdx?$/, '');
    return `/${path}`;
};

/**
 * @param {string} baseDir
 * @param {RegExp} regexp
 */
module.exports = function getRoutesConfig(baseDir, mainDir) {
    const paths = fs.readdirSync(baseDir);

    if (mainDir === undefined) {
        mainDir = baseDir;
    }

    return paths.reduce((out, currentPath) => {
        const normalPath = path.join(baseDir, currentPath);

        if (currentPath === 'index.md') {
            const meta = getFileMetadata(normalPath);
            out.title = meta.title;
            return out;
        }

        if (out.children === undefined) {
            out.children = [];
        }

        if (fs.lstatSync(normalPath).isDirectory()) {
            out.children.push(getRoutesConfig(normalPath, mainDir));
            return out;
        }

        if (fileRegexp.test(normalPath)) {
            const meta = getFileMetadata(normalPath);
            out.children.push({
                title: meta.title,
                href: pathToLink(normalPath, mainDir)
            });
        }

        return out;
    }, {});
};
