#!/usr/bin/env zxpp

/// <reference types="zx" />

import { resolve } from 'path';

import chromeLaunch from 'chrome-launch';
import { createServer } from 'vite';

const server = await createServer({
    configFile: resolve(__dirname, '../vite.config.ts'),
    server: {
        port: 1337
    }
});

await server.listen();

const EXTENSION_PATH = resolve(__dirname, '.');

chromeLaunch('https://reactjs.org/', {
    args: [`--load-extension=${EXTENSION_PATH}`, '--auto-open-devtools-for-tabs', '--user-data-dir=./.tempUserDataDir']
});
