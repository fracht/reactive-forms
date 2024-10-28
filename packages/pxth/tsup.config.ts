import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['./src/index.ts'],
    experimentalDts: true,
    bundle: true,
    format: ['cjs', 'esm'],
    treeshake: 'smallest',
    tsconfig: './tsconfig.lib.json',
    define: {
        'import.meta.vitest': 'undefined',
    },
});
