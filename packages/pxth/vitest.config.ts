import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        includeSource: [
            'src/**/*.{js,cjs,mjs,jsx,mjsx,cjsx,ts,cts,mts,tsx,mtsx,ctsx}',
        ],
    },
});
